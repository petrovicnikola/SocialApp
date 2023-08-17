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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = __importDefault(require("../models/User"));
const path = __importStar(require("path"));
class UserController {
    constructor() {
        this.register = (req, res) => {
            const { username, password, name, surname, email } = req.body;
            User_1.default.findOne({ username: username }, (err, user) => {
                if (user) {
                    res.status(404).json({ 'message': 'exists' });
                    return;
                }
                else {
                    User_1.default.findOne({ email: email }, (err, user) => {
                        if (user) {
                            res.status(404).json({ 'message': 'exists' });
                            return;
                        }
                        else {
                            const newUser = new User_1.default({ username, password, name, surname, email, gender: '', bio: '' });
                            newUser.save().then(user => {
                                res.status(200).json({ message: "ok" });
                            }).catch(err => {
                                res.json({ message: err });
                            });
                        }
                    });
                }
            });
        };
        this.login = (req, res) => {
            const { username, password } = req.body;
            User_1.default.findOne({ username: username, password: password }, (err, user) => {
                if (err) {
                    res.status(404).json({ message: 'An error occured.' });
                }
                else {
                    if (user) {
                        res.status(200).json(user);
                    }
                    else {
                        res.status(404).json({ message: 'User not found!' });
                    }
                }
            });
        };
        this.upload = (req, res) => {
            const { username } = req.body;
            const file = req['file'];
            if (!file) {
                res.status(400).json({ message: 'No file provided' });
                return;
            }
            User_1.default.findOne({ username: username }, (err, user) => {
                if (err) {
                    console.log(err);
                    res.status(404).json({});
                }
                else {
                    user.photo = path.join('uploads', file.filename);
                    user.save().then(() => {
                        res.status(200).json({ filename: file.filename });
                    });
                }
            });
        };
        this.getPhoto = (req, res) => {
            const { username } = req.body;
            User_1.default.findOne({ username: username }, (err, user) => {
                if (err) {
                    console.log(err);
                    res.status(404).json({});
                }
                else {
                    if (user['photo']) {
                        let url = user['photo'].split('\\')[1];
                        res.status(200).json(url);
                    }
                    else
                        res.status(200).json('');
                }
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map