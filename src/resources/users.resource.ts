import express, { Request, Response, NextFunction } from 'express';
import { UsersService } from '../services/users.service';

export const usersResource = express.Router();

let service = new UsersService();

usersResource.get('/', async ( req:Request, res:Response, next:NextFunction ) => {
    res
        .status(200)
        .json({
            "data":await service.getAllUsers()
        })
});