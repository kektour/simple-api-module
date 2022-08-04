import { UserServiceImpl } from './userServiceImpl';
import { UserService, UserServiceCreateUserPayload, UserServiceFindUserFilter } from './userService';
import { UserDal } from '../../dal/userDal';

describe('UserServiceImpl', () => {
  let userService: UserService;
  let userDal: UserDal;

  beforeEach(() => {
    userDal = {
      createUser() {
        throw new Error('Not implemented error');
      },
      findUser() {
        throw new Error('Not implemented error');
      },
      deleteUser() {
        throw new Error('Not implemented error');
      },
    };

    userService = new UserServiceImpl(userDal);
  });

  it('should resolve findUser call', async () => {
    const filter: UserServiceFindUserFilter = { name: 'John' };
    const usersFromDal = [{ id: 1 }, { id: 2 }];

    const userDalFindUserFn = jest.spyOn(userDal, 'findUser').mockResolvedValueOnce(usersFromDal as any);

    const res = await userService.findUser(filter);

    expect(res).toEqual(usersFromDal);
    expect(userDalFindUserFn).toHaveBeenCalledWith(filter);
  });

  it('should throw error if there is empty filter object', () => {
    expect(() => userService.findUser({})).toThrow('Filter object should has one or more attributes');
  });

  it('should resolve createUser call', async () => {
    const payload: UserServiceCreateUserPayload = { name: 'John' };
    const createdUser = { id: 11, ...payload };

    const userDalCreateUserFn = jest.spyOn(userDal, 'createUser').mockResolvedValueOnce(createdUser as any);

    const res = await userService.createUser(payload);

    expect(res).toEqual(createdUser);
    expect(userDalCreateUserFn).toHaveBeenCalledWith(payload);
  });

  it('should throw error if there is empty payload object', () => {
    expect(() => userService.createUser({})).toThrow('User object should has one or more attributes');
  });
});
