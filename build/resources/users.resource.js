"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersResource = void 0;
const express_1 = __importDefault(require("express"));
const users_service_1 = require("../services/users.service");
const CLIENT_URL = process.env.CLIENT_URL;
exports.usersResource = express_1.default.Router();
let service = new users_service_1.UsersService();
exports.usersResource.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res
            .status(200)
            .json({ "data": yield service.getAllUsers() });
    }
    catch (e) {
        res
            .status(502)
            .json({ "data": e });
    }
}));
exports.usersResource.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stripeTicketId, createdAt, email } = req.body;
        const resp = yield service.addUser(stripeTicketId, createdAt, email);
        // notify - [DEPRECATED]
        // await axios.post(`${CLIENT_URL}/api/lottery`, resp);
        // console.log("notifier with success");
        res
            .status(200)
            .json({ "data": resp });
    }
    catch (e) {
        res
            .status(502)
            .json({ "data": e });
    }
}));
