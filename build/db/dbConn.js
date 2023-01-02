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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_NAME = void 0;
const mongodb_1 = require("mongodb");
const URL_CONN = process.env.DB_URI;
exports.DB_NAME = "lotby";
let client;
/**
 * Reuse connection
 */
const Db = {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!client) {
                    let conn = new mongodb_1.MongoClient(URL_CONN, {
                        minPoolSize: 5,
                    });
                    client = yield conn.connect();
                    console.log("Connection to DB with success");
                    return client;
                }
                console.log("Connection to DB with success (reused)");
                return client;
            }
            catch (e) {
                console.log(e);
            }
        });
    },
    getConn() {
        return __awaiter(this, void 0, void 0, function* () {
            return client;
        });
    }
};
exports.default = Db;
