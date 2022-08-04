import { UserDal } from '../../dal/userDal';
import { UserService, UserServiceCreatedUser, UserServiceCreateUserPayload, UserServiceFindUserFilter, UserServiceFoundUser } from './userService';

export class UserServiceImpl implements UserService {
  constructor(private readonly _userDal: UserDal) {}

  public findUser(filter: UserServiceFindUserFilter): Promise<Array<UserServiceFoundUser>> {
    if (!Object.keys(filter).length) {
      throw new Error('Filter object should has one or more attributes');
    }

    return this._userDal.find(filter);
  }

  public createUser(payload: UserServiceCreateUserPayload): Promise<UserServiceCreatedUser> {
    if (!Object.keys(payload).length) {
      throw new Error('User object should has one or more attributes');
    }

    return this._userDal.create(payload);
  }

  public deleteUser(id: number): Promise<void> {
    return this._userDal.delete(id);
  }
}
