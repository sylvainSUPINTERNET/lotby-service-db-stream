import { IUser } from "../dto/users.dto";

export interface UsersRepository {

    getAllUsers(): Promise<IUser[] | never>;

    addUser( stripeTicketId:string, createdAtISOFormat:string, email:string ): Promise<IUser | never>;
}