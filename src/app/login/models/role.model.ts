export class IRole {
  _id: string = '';
  name: string = '';
  description: string = '';
  permissions: string[] = [];
  creation_date: string = '';
  mod_date: string = '';
  is_active: boolean = true;
  default_role: boolean;
  screens: string[] = [];
  app: string = '';
}
