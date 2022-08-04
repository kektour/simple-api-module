export interface UserDalRawUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UserDalUser {
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

export interface UserDalFindFilter {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface UserDalCreateUserPayload {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface UserDalCreatedUser extends UserDalCreateUserPayload {
  id: number;
}

export interface UserDal {
  find(filter?: UserDalFindFilter): Promise<Array<UserDalUser>>;
  create(userPayload: UserDalCreateUserPayload): Promise<UserDalCreatedUser>;
  delete(id: number): Promise<void>;
}
