import { ApiRequestImpl } from './services/apiRequest';
import { UserDalImpl } from './dal/userDal';
import { UserServiceCreateUserPayload, UserServiceFindUserFilter, UserServiceImpl } from './services/userService';

const apiRequest = new ApiRequestImpl();
const userDal = new UserDalImpl(apiRequest);
const userService = new UserServiceImpl(userDal);

export const findUser = (filter: UserServiceFindUserFilter) => userService.findUser(filter);

export const createUser = (payload: UserServiceCreateUserPayload) => userService.createUser(payload);

export const deleteUser = (id: number) => userService.deleteUser(id);
