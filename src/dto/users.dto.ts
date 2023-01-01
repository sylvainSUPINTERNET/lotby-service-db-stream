import { ObjectId } from "mongodb";

export interface IUser{
    id: ObjectId;
    stripeTicketId: string;
    createdAt: string; // ISO Date
}