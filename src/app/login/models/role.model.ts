export class IRole {
  _id?: string = '';
  name?: string = '';
  permissions?: string[] = [];
  is_active?: boolean = true;
  screens?: string[] = [];
  app: string = '';

  constructor(
    _id: string = '',
    name: string = '',
    permissions: string[] = [],
    is_active: boolean = true,
    screens: string[] = [],
    app: string = ''
  ) {
    this._id = _id;
    this.name = name;
    this.permissions = permissions;
    this.is_active = is_active;
    this.screens = screens;
    this.app = app;
  }
}
