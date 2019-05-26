import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import {
  Candidate,
  Comment,
  Donation,
  Location,
  Point,
  rawComment,
  RawDonation,
  rawLocation,
  rawPoint, User
} from './donation-types';
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import {TotalComment, TotalPUpdate, TotalUpdate} from './messages';

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class DonationService {

  users: Map<string, User> = new Map();
  usersById: Map<string, User> = new Map();
  candidates: Candidate[] = [];
  donations: Donation[] = [];
  paymentMethods = ['Cash', 'Paypal'];
  points: Point[] = [];
  pointsR : rawPoint[] = [];
  locations: Location[] = [];
  locationsR: rawLocation[] = [];
  commentsR: rawComment[];
  comments: Comment[];
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
  }

  async getCandidates() {
    const response = await this.httpClient.get('/api/candidates');
    this.candidates = await response.content;
    console.log(this.candidates);
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

  async donate(amount: number, method: string, candidate: Candidate, location: Location) {
    const donation = {
      amount: amount,
      method: method,
      candidate: candidate,
      donor: null,
      location : location
    };
    const response = await this.httpClient.post('/api/candidates/' + candidate._id + '/donations', donation);

    this.donations.push(donation);
    this.total = this.total + amount;
    this.ea.publish(new TotalUpdate(this.total,donation));
    console.log('Total so far ' + this.total);
  }




  async getLocations() {
    const response = await this.httpClient.get('/api/locations');
    this.locations = await response.content;
  }

  async getLocationsR() {
    const response = await this.httpClient.get('/api/locations');
    this.locationsR = await response.content;
  }

  async getRawPoints() {
    const response = await this.httpClient.get('/api/points');
    this.pointsR = await response.content;
    console.log("pointsR " + this.pointsR[1]._id);
  }

  async getUsers() {
    const response = await this.httpClient.get('/api/users');
    const users = await response.content;
    users.forEach(user => {
      this.users.set(user.email, user);
      this.usersById.set(user._id, user);
    });
  }






  async createPoint(name: string, category: string, description: string, pimage: string, location1: Location) {

    const location = {
      lat: location1.lat,
      lng: location1.lng,
    };
    const response1 = await this.httpClient.post('/api/locations', location);
    const newLocation = await response1.content;
    this.locations.push(newLocation);


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
    };
    const response = await this.httpClient.post('/api/comments', comment);
    const newComment = await response.content;
    this.comments.push(newComment);
    this.totalComments = this.comments.length;
    this.ea.publish(new TotalComment(this.totalComments));
    //console.log('Total so far ' + this.totalP);
  }

  async getDonations() {
    const response = await this.httpClient.get('/api/donations');
    const rawDonations: RawDonation[] = await response.content;
    rawDonations.forEach(rawDonation => {
      const donation = {
        amount: rawDonation.amount,
        method: rawDonation.method,
        candidate: this.candidates.find(candidate => rawDonation.candidate == candidate._id),
        location: rawDonation.location,
        donor: null
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
    //  this.rawPoints = await response.content;

    //  const response2 = await this.httpClient.get('/api/locations');
    //  const rawLocations: rawLocation[] = await response2.content;

//let rawPoints2 = rawPoint[];
//  rawPoints2 = this.rawPoints;
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
      this.points.push(point);

    });
    this.totalP = this.points.length;
    this.totalCat = this.categories.length;
    //console.log(this.points);
  }





  async getComments() {
    const response = await this.httpClient.get('/api/comments');
    const rawComments: rawComment[] = await response.content;

    rawComments.forEach(rawComment => {
      const comment = {
        opinion: rawComment.opinion,
        user: rawComment.user,
        point: rawComment.point

        //  point: this.points.find(point => rawComment.point == point._id),
        //  user: this.users.find(user => rawComment.user == user._id),

        //donor: this.usersById.get(rawDonation.donor)
        //donor: this.users.get(user => rawDonation.donor == user._id),
        // donor: this.usersById.get(rawDonation.donor)
      };
      this.comments.push(comment);

      this.totalComments = this.comments.length;
      this.ea.publish(new TotalComment(this.totalComments));
    });

    // let tempT = 0;
    // this.donations.forEach(donation => {
    //   tempT = donation.amount + tempT;
    // });
    // this.total = tempT;
  }







  async signup(firstName: string, lastName: string, email: string, password: string) {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    const response = await this.httpClient.post('/api/users', user);
    const newUser = await response.content;
    this.changeRouter(PLATFORM.moduleName('app'));
    return false;
  }

  async login(email: string, password: string) {
    const response = await this.httpClient.post('/api/users/authenticate', {
      email: email,
      password: password
    });
    const status = await response.content;
    if (status.success) {
      this.httpClient.configure(configuration => {
        configuration.withHeader('Authorization', 'bearer ' + status.token);
      });
      localStorage.donation = JSON.stringify(response.content);
      await this.getCandidates();
      await this.getUsers();
      await this.getDonations();
      await this.getRawPoints();
      await this.getPoints();
      await this.getLocations();
      await this.getLocationsR();
      await this.getComments();
      this.changeRouter(PLATFORM.moduleName('app'));
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.donation = null;
    this.httpClient.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
    this.changeRouter(PLATFORM.moduleName('start'));
  }

  changeRouter(module: string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }

  checkIsAuthenticated() {
    let authenticated = false;
    if (localStorage.donation !== 'null') {
      authenticated = true;
      this.httpClient.configure(http => {
        const auth = JSON.parse(localStorage.donation);
        http.withHeader('Authorization', 'bearer ' + auth.token);
      });
      this.changeRouter(PLATFORM.moduleName('app'));
    }
  }


}
