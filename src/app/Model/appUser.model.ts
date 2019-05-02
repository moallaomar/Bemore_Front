import {Role} from "./role";

export class appUser {


  id: number;
  username: string;
  roles: Role[];
  actived: boolean;

  constructor() {
  }
}
