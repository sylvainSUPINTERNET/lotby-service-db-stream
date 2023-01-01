import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { usersResource } from './resources/users.resource';
import Db from './db/dbConn';

const app = express();
const port = process.env.PORT || 8080


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/users', usersResource);



app.listen(port, async () => {
  await Db.connect();
  
  return console.log(`Server is listening on ${port}`)
})