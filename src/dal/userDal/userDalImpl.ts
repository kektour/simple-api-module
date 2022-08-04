import { UserDal, UserDalUser, UserDalCreateUserPayload, UserDalFindFilter, UserDalRawUser, UserDalCreatedUser } from './userDal';

import { ApiRequest } from '../../services/apiRequest';

export class UserDalImpl implements UserDal {
  constructor(private readonly _apiRequest: ApiRequest) {}

  public async find(filter?: UserDalFindFilter): Promise<Array<UserDalUser>> {
    const rawUsers = await this._apiRequest.get<Array<UserDalRawUser>>('https://jsonplaceholder.typicode.com/users', filter);

    return this._mapFoundRawUsers(rawUsers, new Date());
  }

  public create(userPayload: UserDalCreateUserPayload): Promise<UserDalCreatedUser> {
    if (!Object.keys(userPayload).length) {
      throw new Error('User object should has one or more attributes');
    }

    return this._apiRequest.post<UserDalCreatedUser>('https://jsonplaceholder.typicode.com/users', userPayload);
  }

  public delete(id: number): Promise<void> {
    return this._apiRequest.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  }

  private _mapFoundRawUsers(rawUsers: Array<UserDalRawUser>, dateRequest: Date): Array<UserDalUser> {
    return rawUsers.map((rawUser) => ({
      name: rawUser.name,
      surname: rawUser.username,
      email: rawUser.email,
      street: rawUser.address.street,
      suite: rawUser.address.suite,
      city: rawUser.address.city,
      zipcode: rawUser.address.zipcode,
      mobile: rawUser.phone,
      registeredService: rawUser.website,
      companyName: rawUser.company.name,
      dateRequest: dateRequest.toISOString(),
    }));
  }
}
