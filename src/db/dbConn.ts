import { MongoClient } from "mongodb";


const URL_CONN = process.env.DB_URI;
const CLIENT_URL = process.env.CLIENT_URL;

export const DB_NAME="lotby";

let client: undefined | MongoClient;

/**
 * Reuse connection 
 */
const Db = {
    async connect () {
        try {

            if ( !client ) {
                let conn = new MongoClient(URL_CONN!, {
                    minPoolSize: 5,
                });
                client = await conn.connect();
                console.log("Connection to DB with success")
                return client;
            }
            console.log("Connection to DB with success (reused)")
            return client;

        } catch ( e ) {
            console.log(e);
        }
    },

    async getConn() {
        return client;
    }
}


export default Db;



