import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { Candidate, Donation, RawDonation, User, Point ,rawPoint, Location, rawLocation,Comment, rawComment} from './donation-types';
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { TotalUpdate,TotalPUpdate, TotalCatUpdate, TotalComment } from './messages';

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class DonationService {
  users: Map<string, User> = new Map();
  usersById: Map<string, User> = new Map();
  pois: Map<string, Point> = new Map();
  poisById: Map<string, Point> = new Map();
  currentUserEmail: string;
  candidates: Candidate[] = [];
  donations: Donation[] = [];
  points: Point[] = [];
  locations: Location[] = [];
  locationsR: rawLocation[] = []
  comments: Comment[];
  paymentMethods = ['Cash', 'Paypal'];
  categories = ['Islands','Rivers','Furniture'];
  total = 0;
  totalP = 0;
  totalCat = 0;
  totalComments = 0;

  constructor(
    private httpClient: HttpClient,
    private ea: EventAggregator,
    private au: Aurelia,
    private router: Router
  ) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:3000');
    });
    this.getCandidates();
    this.getUsers();
    this.getDonations();
    this.getPoints();
    this.getLocations();
    this.getLocationsR();
    }

  async getCandidates() {
    const response = await this.httpClient.get('/api/candidates');
    this.candidates = await response.content;
    console.log(this.candidates);
  }
  async getLocations() {
    const response = await this.httpClient.get('/api/locations');
    this.locations = await response.content;
  }

  async getLocationsR() {
    const response = await this.httpClient.get('/api/locations');
    this.locationsR = await response.content;

  }


  async getUsers() {
    const response = await this.httpClient.get('/api/users');
    const users = await response.content;
    users.forEach(user => {
      this.users.set(user.email, user);
      this.usersById.set(user._id, user);
    });
  }

  async getDonations() {
    const response = await this.httpClient.get('/api/donations');
    const rawDonations: RawDonation[] = await response.content;
    rawDonations.forEach(rawDonation => {
      const donation = {
        amount: rawDonation.amount,
        method: rawDonation.method,
        candidate: this.candidates.find(candidate => rawDonation.candidate == candidate._id),
        donor: this.users.get(this.currentUserEmail),
        location: rawDonation.location

        //donor: this.usersById.get(rawDonation.donor)
        //donor: this.users.get(user => rawDonation.donor == user._id),
        // donor: this.usersById.get(rawDonation.donor)
      };
      this.donations.push(donation);
    });

    let tempT = 0;
    this.donations.forEach(donation => {
      tempT = donation.amount + tempT;
    });
    this.total = tempT;
  }




  async getPoints() {
    const response = await this.httpClient.get('/api/points');
    const rawPoints: rawPoint[] = await response.content;
    const response2 = await this.httpClient.get('/api/locations');
    const rawLocations: rawLocation[] = await response2.content;


    rawPoints.forEach(rawPoint => {
      console.log("inside getPints" + rawPoint.location)
      const point = {
        name: rawPoint.name,
        category: rawPoint.category,
        description: rawPoint.description,
        //this.candidates.find(candidate => rawDonation.candidate == candidate._id),
        pimage: rawPoint.pimage,
        //location: rawPoint.location
        location: this.locationsR.find(location => rawPoint.location ==  location._id)
        //donor: this.users.get(this.currentUserEmail)
        // this.usersById.get(rawDonation.donor)
      };
      console.log("point login: " +this.currentUserEmail);
      this.points.push(point);

    });
    this.totalP = this.points.length;
    this.totalCat = this.categories.length;
    //console.log(this.points);
  }




        async createCandidate(firstName: string, lastName: string, office: string) {
          const candidate = {
            firstName: firstName,
            lastName: lastName,
            office: office
          };
          const response = await this.httpClient.post('/api/candidates', candidate);
          const newCandidate = await response.content;
          this.candidates.push(newCandidate);
        }

        async createLocation(lat: number, lng: number) {
            const location = {
            lat: lat,
            lng: lng,
            };
            const response = await this.httpClient.post('/api/locations', location);
            const newLocation = await response.content;
            this.locations.push(newLocation);

        }


        async donate(amount: number, method: string, candidate: Candidate, location: Location) {

          const donation = {
            amount: amount,
            method: method,
            candidate: candidate,
            donor: this.users.get(this.currentUserEmail),
            location : location
            // donor: 'na'
          };
          console.log("donate login: " +this.currentUserEmail)
          const response = await this.httpClient.post('/api/candidates/' + candidate._id + '/donations', donation);
          this.donations.push(donation);

          this.total = this.total + amount;
          this.ea.publish(new TotalUpdate(this.total,donation));
          console.log('Total so far ' + this.total);
        }



        async createPoint(name: string, category: string, description: string, pimage: string, location1: Location) {

          const location = {
            lat: location1.lat,
            lng: location1.lng,
          };
          const response1 = await this.httpClient.post('/api/locations', location);
          const newLocation = await response1.content;
          this.locations.push(newLocation);
          console.log("create pt "+ location.lat);


          const point = {
            name: name,
            category: category,
            description: description,
            pimage: pimage,
            location: newLocation._id
          };
          const response = await this.httpClient.post('/api/points', point);
          const newPoint = await response.content;
          this.points.push(newPoint);
          this.totalP = this.points.length;
          this.ea.publish(new TotalPUpdate(this.totalP,newPoint));
          console.log('Total so far ' + this.totalP);
        }


  async createComment(opinion: string, point: Point) {

    //const response1 = await this.httpClient.post('/api/comments', location);
    //const newLocation = await response1.content;
    //this.locations.push(newLocation);
    //console.log("create pt "+ location.lat);


    const comment = {
      opinion: opinion,
      point: point,
      user: this.users.get(this.currentUserEmail)
    };

    const response = await this.httpClient.post('/api/comments', comment);
    const newComment = await response.content;
    this.comments.push(newComment);
    //this.totalP = this.points.length;
    //this.ea.publish(new TotalPUpdate(this.totalP,newPoint));
    //console.log('Total so far ' + this.totalP);
  }





 // async comment(opinion: string, point: Point)

   // const pid = this.points.get(this.point._id)._id;
  //  this.points.find(point => rawComment.point == point._id),

  //  const comment = {
    //  opinion: opinion,
    //  point: point,
    //  user: this.users.get(this.currentUserEmail)._id
      // location : location
      // donor: 'na'
   // };
  //  console.log("current user: " +this.currentUserEmail)
   // const response = await this.httpClient.post('/api/points/' + point._id + '/comments', comment);
  //  this.comments.push(comment);

  //  this.totalComment = this.totalComment + 1;
    //this.ea.publish(new TotalUpdate(this.total,donation));
   // console.log('Total so far ' + this.totalComment);
 // }





        async signup(firstName: string, lastName: string, email: string, password: string) {
          const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
          };
          const response = await this.httpClient.post('/api/users', user);
          const newUser = await response.content;
          this.users.set(newUser.email, newUser);
          this.usersById.set(newUser._id, newUser);
          this.changeRouter(PLATFORM.moduleName('app'))
          return false;
        }

        async login(email: string, password: string) {

          const user = this.users.get(email);
          if (user && user.password === password) {
            this.changeRouter(PLATFORM.moduleName('app'))
            this.currentUserEmail = email;
            console.log("current login: " +this.currentUserEmail)
            return true;
          } else {
            return false;
          }
        }

        logout() {
          this.changeRouter(PLATFORM.moduleName('start'));
        }

        changeRouter(module: string) {
          this.router.navigate('/', { replace: true, trigger: false });
          this.router.reset();
          this.au.setRoot(PLATFORM.moduleName(module));
        }
      }

