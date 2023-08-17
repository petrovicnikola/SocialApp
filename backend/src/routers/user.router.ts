import express from "express";
import { UserController } from "../controllers/user.controller"

const multer = require('multer');


const userRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, './uploads');
    },
    filename: (req, file, callback) => {
      callback(null, Date.now() + '-' + file.originalname);
    },
});
  
const upload = multer({ storage: storage });

userRouter.route('/register').post(
    (req, res) => {
        (new UserController()).register(req, res);
    }
)

userRouter.route('/login').post(
    (req, res) => {
        (new UserController()).login(req, res);
    }
)

userRouter.post('/upload', upload.single('file'), (req, res) => {
    (new UserController()).upload(req, res);
})

userRouter.route('/getPhoto').post(
    (req, res) => {
        (new UserController()).getPhoto(req, res);
    }
)

userRouter.route('/getWithUsername').post(
    (req, res) => {
        (new UserController()).getWithUsername(req, res);
    }
)

export default userRouter;
