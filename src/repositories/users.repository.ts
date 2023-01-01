import { IUser } from "../dto/users.dto";

export interface UsersRepository {
    getAllUsers(): Promise<IUser[]|never>;
}