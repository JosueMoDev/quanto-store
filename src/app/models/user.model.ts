export interface UserOptions {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
  refreshToken: string;
}
export class User {
  public id: string;
  public displayName: string;
  public photoUrl: string;
  public email: string;
  public token: string;

  constructor(options: UserOptions) {
    this.id = options.uid;
    this.displayName = options.displayName ?? 'Unknonw';
    this.photoUrl = options.photoURL ?? '';
    this.email = options.email ?? '';
    this.token = options.refreshToken;
  }
}
