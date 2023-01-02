import { IUser } from "../dto/users.dto";
import { UsersRepository } from "../repositories/users.repository";
import Db, { DB_NAME } from '../db/dbConn';

export class UsersService implements UsersRepository {

    async addUser( stripeTicketId:string, createdAtISOFormat:string, email:string ): Promise<IUser | never> {


            const client = await Db.getConn();

            if ( client ) {
                
                const session = client.startSession();

                try {

                    session.startTransaction();

                    const result = await client.db(DB_NAME).collection("users").insertOne({
                        stripeTicketId,
                        createdAt: createdAtISOFormat,
                        email
                    }, { session });

                    await session.commitTransaction();
                    console.log('Transaction successfully committed.');

                    return new Promise( (resolve, _reject) => {
                        resolve({
                            id: result.insertedId,
                            email,
                            stripeTicketId,
                            createdAt: createdAtISOFormat
                        });
                    });

                } catch ( e ) {
                    session.abortTransaction();
                    throw new Error("Error occured while adding user");
                } finally {
                    session.endSession();
                }
            }

            throw Error("Client not started. Failed to add user");
    }

    async getAllUsers(): Promise<IUser[] | never> {

        try {
            const client = await Db.getConn();

            let result: IUser[] = [];
    
            if ( client ) {


                let data = await client.db(DB_NAME).collection("users").find().toArray();

                for ( let i = 0; i<data.length; i++) {
                    result = [...result, {
                        id: data[i]._id,
                        email: data[i].email,
                        stripeTicketId: data[i].stripeTicketId,
                        createdAt: data[i].createdAt
                    }]
                }
    
                return new Promise( (resolve, _reject) => {
                    resolve(result);
                });

            }

            return new Promise( (_resolve, reject) => {
                reject("Error connecting to database, client is not started");
            });

        } catch ( e ) {
            throw new Error("Error occured while getting all users");
        }

    

    }

}