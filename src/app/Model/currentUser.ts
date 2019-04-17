import {Role} from "./role";


export class CurrentUser {


  constructor() {
  }

  authenticated: boolean;
  principal: string;
  credentials: string;
  authorities: Role[];
  name:String;

}

