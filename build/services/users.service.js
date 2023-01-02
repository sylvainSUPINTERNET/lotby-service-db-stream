"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const dbConn_1 = __importStar(require("../db/dbConn"));
class UsersService {
    addUser(stripeTicketId, createdAtISOFormat, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield dbConn_1.default.getConn();
            if (client) {
                const session = client.startSession();
                try {
                    session.startTransaction();
                    const result = yield client.db(dbConn_1.DB_NAME).collection("users").insertOne({
                        stripeTicketId,
                        createdAt: createdAtISOFormat,
                        email
                    }, { session });
                    yield session.commitTransaction();
                    console.log('Transaction successfully committed.');
                    return new Promise((resolve, _reject) => {
                        resolve({
                            id: result.insertedId,
                            email,
                            stripeTicketId,
                            createdAt: createdAtISOFormat
                        });
                    });
                }
                catch (e) {
                    session.abortTransaction();
                    throw new Error("Error occured while adding user");
                }
                finally {
                    session.endSession();
                }
            }
            throw Error("Client not started. Failed to add user");
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield dbConn_1.default.getConn();
                let result = [];
                if (client) {
                    let data = yield client.db(dbConn_1.DB_NAME).collection("users").find().toArray();
                    for (let i = 0; i < data.length; i++) {
                        result = [...result, {
                                id: data[i]._id,
                                email: data[i].email,
                                stripeTicketId: data[i].stripeTicketId,
                                createdAt: data[i].createdAt
                            }];
                    }
                    return new Promise((resolve, _reject) => {
                        resolve(result);
                    });
                }
                return new Promise((_resolve, reject) => {
                    reject("Error connecting to database, client is not started");
                });
            }
            catch (e) {
                throw new Error("Error occured while getting all users");
            }
        });
    }
}
exports.UsersService = UsersService;
