import { IRole } from "./role.model";

export class IAuth {
  email: string = '';
  name: string = '';
  status: string = '';
  role: IRole = new IRole(); 
  token: string = '';
}
