import { UserDal, UserDalFoundMappedUser, UserDalCreateUserPayload, UserDalFindFilter, UserDalFoundRawUser, UserDalCreatedUser } from './userDal';

import { ApiRequest } from '../../services/apiRequest';

export class UserDalImpl implements UserDal {
  constructor(private readonly _apiRequest: ApiRequest) {}

  public async findUser(filter?: UserDalFindFilter): Promise<Array<UserDalFoundMappedUser>> {
    const rawUsers = await this._apiRequest.get<Array<UserDalFoundRawUser>>('https://jsonplaceholder.typicode.com/users', filter);

    return this._mapFoundRawUsers(rawUsers, new Date());
  }

  public createUser(payload: UserDalCreateUserPayload): Promise<UserDalCreatedUser> {
    return this._apiRequest.post<UserDalCreatedUser>('https://jsonplaceholder.typicode.com/users', payload);
  }

  public deleteUser(id: number): Promise<void> {
    return this._apiRequest.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  }

  private _mapFoundRawUsers(rawUsers: Array<UserDalFoundRawUser>, dateRequest: Date): Array<UserDalFoundMappedUser> {
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
