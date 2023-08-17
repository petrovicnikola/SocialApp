"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const multer = require('multer');
const userRouter = express_1.default.Router();
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });
userRouter.route('/register').post((req, res) => {
    (new user_controller_1.UserController()).register(req, res);
});
userRouter.route('/login').post((req, res) => {
    (new user_controller_1.UserController()).login(req, res);
});
userRouter.post('/upload', upload.single('file'), (req, res) => {
    (new user_controller_1.UserController()).upload(req, res);
});
userRouter.route('/getPhoto').post((req, res) => {
    (new user_controller_1.UserController()).getPhoto(req, res);
});
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map