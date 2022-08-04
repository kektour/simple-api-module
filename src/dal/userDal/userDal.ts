export interface UserDalFindFilter {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface UserDalFoundRawUser {
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

export interface UserDalFoundMappedUser {
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
  findUser(filter?: UserDalFindFilter): Promise<Array<UserDalFoundMappedUser>>;
  createUser(payload: UserDalCreateUserPayload): Promise<UserDalCreatedUser>;
  deleteUser(id: number): Promise<void>;
}
