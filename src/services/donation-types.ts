export interface Candidate {
  firstName: string;
  lastName: string;
  office: string;
  _id:string;
}

export interface Donation {
  amount: number;
  method: string;
  candidate: Candidate;
  donor: User;
  location: Location;
}
export interface RawDonation {
  amount: number;
  method: string;
  candidate: string;
  donor: string;
  location: Location;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id:string;
}

export interface Poi {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id:string;
}

export interface Point {
  name: string;
  category: string;
  description: string;
  pimage: string;
  location: Location;
}

export interface rawPoint {
  name: string;
  category: string;
  description: string;
  pimage: string;
  location: string;
  _id: string;

}

export interface Location {
  lat: number;
  lng: number;
}
export interface rawLocation {
  lat: number;
  lng: number;
  _id: string;
}

export interface Comment {
  opinion: string;
  user: User;
  point: Point;

}

export interface rawComment {
  opinion: string;
  user: string;
  point: string;
  _id: string;

}
