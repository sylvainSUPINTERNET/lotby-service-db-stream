import { ObjectId } from "mongodb";

export interface IUser{
    id: ObjectId;
    stripeTicketId: string;
    email: string;
    createdAt: string; // ISO Date
}