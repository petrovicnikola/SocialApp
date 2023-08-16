import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routers/user.router';
import statusRouter from './routers/status.router';

const app = express();
app.use(cors());
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1:27017/social_app');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connection sucessfull');
});

app.use('/uploads', express.static('uploads'));

const router = express.Router();
app.use('/', router);
app.use('/users', userRouter);
app.use('/statuses', statusRouter);

app.listen(4000, () => console.log(`Express server running on port 4000`));