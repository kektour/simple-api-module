export interface UserServiceFindUserFilter {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface UserServiceFoundUser {
  name: string;
  surname: string;
  email: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  mobile: string;
  registeredService: string;
  companyName: string;
  dateRequest: string;
}

export interface UserServiceCreateUserPayload {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface UserServiceCreatedUser extends UserServiceCreateUserPayload {
  id: number;
}

export interface UserService {
  findUser(filter: UserServiceFindUserFilter): Promise<Array<UserServiceFoundUser>>;
  createUser(payload: UserServiceCreateUserPayload): Promise<UserServiceCreatedUser>;
  deleteUser(id: number): Promise<void>;
}
