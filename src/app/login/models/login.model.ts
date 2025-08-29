import { IRole } from './role.model';

export class IAuth {
  _id?: string;
  email?: string;
  name?: string;
  status?: string;
  role?: IRole;
  token?: string;
  constructor(
    _id: string = '',
    email: string = '',
    name: string = '',
    status: string = '',
    role: IRole = new IRole(),
    token: string = ''
  ) {
    this._id = _id;
    this.email = email;
    this.name = name;
    this.status = status;
    this.role = role;
    this.token = token;
  }
}
