import { bindable } from 'aurelia-framework';
import {Comment} from "../../services/donation-types";

export class CommentList {
  @bindable
  comments : Comment[];
}
