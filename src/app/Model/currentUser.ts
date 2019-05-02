import {Role} from "./role";


export class CurrentUser {


  authenticated: boolean;
  principal: string;
  credentials: string;
  authorities: Role[];
  name: String;

  constructor() {
  }

}

