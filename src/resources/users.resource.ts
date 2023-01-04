import express, { Request, Response, NextFunction } from 'express';
import { UsersService } from '../services/users.service';
import axios from "axios";

const CLIENT_URL = process.env.CLIENT_URL;

export const usersResource = express.Router();

let service = new UsersService();

usersResource.get('/', async ( req:Request, res:Response, next:NextFunction ) => {

    try {

        res
            .status(200)
            .json({"data":await service.getAllUsers()});

    } catch ( e ) {

        res
            .status(502)
            .json({"data": e});
    }

});

usersResource.post('/', async ( req:Request, res:Response, next:NextFunction ) => {

    try {

        const { stripeTicketId, createdAt, email } = req.body;

        const resp = await service.addUser(stripeTicketId, createdAt, email);

        // notify - [DEPRECATED]
        // await axios.post(`${CLIENT_URL}/api/lottery`, resp);
        // console.log("notifier with success");

        res
            .status(200)
            .json({"data": resp});

    } catch ( e ) {

        res
            .status(502)
            .json({"data": e});

    }

});