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
exports.StatusController = void 0;
const Status_1 = __importDefault(require("../models/Status"));
const mongodb_1 = require("mongodb");
class StatusController {
    constructor() {
        this.newStatus = (req, res) => {
            const { username, text } = req.body;
            const status = new Status_1.default({ username, text, comments: [] });
            status.save().then((status) => {
                res.status(200).json({ message: 'ok' });
            }).catch((err) => {
                res.status(404).json({ message: 'notOk' });
            });
        };
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const statuses = yield Status_1.default.find({}).sort({ createdAt: -1 });
            if (!statuses)
                res.json(404).json({ message: 'notOk' });
            else
                res.status(200).json(statuses);
        });
        this.like = (req, res) => {
            const { username, _id } = req.body;
            const objId = new mongodb_1.ObjectId(_id);
            Status_1.default.findOne({ _id: objId, likedBy: username }, (err, status) => {
                if (status) {
                    Status_1.default.updateOne({ _id: objId }, { $pull: { likedBy: username } }).then((result) => {
                        if (result.modifiedCount === 1) {
                            Status_1.default.findOne({ _id: objId }, (err, status) => {
                                if (err) {
                                    console.log(err);
                                    res.status(404).json({});
                                }
                                else {
                                    res.status(200).json(status.likedBy);
                                }
                            });
                        }
                    });
                }
                else {
                    Status_1.default.updateOne({ _id: objId }, { $push: { likedBy: username } }).then((result) => {
                        if (result.modifiedCount === 1) {
                            Status_1.default.findOne({ _id: objId }, (err, status) => {
                                if (err) {
                                    console.log(err);
                                    res.status(404).json({});
                                }
                                else {
                                    res.status(200).json(status.likedBy);
                                }
                            });
                        }
                    });
                }
            });
        };
        this.getWithId = (req, res) => {
            const { id } = req.body;
            Status_1.default.findOne({ _id: id }, (err, status) => {
                if (err) {
                    console.log(err);
                    res.status(404).json('Error');
                }
                else {
                    res.status(200).json(status);
                }
            });
        };
        this.comment = (req, res) => {
            const { username, text, id } = req.body;
            Status_1.default.updateOne({ _id: id }, { $push: { comments: { username, text, createdAt: Date.now() } } }).then((result) => {
                if (result.modifiedCount === 1) {
                    Status_1.default.findOne({ _id: id }, (err, status) => {
                        if (err) {
                            console.log(err);
                            res.status(404).json({});
                        }
                        else {
                            res.status(200).json(status.comments);
                        }
                    });
                }
            });
        };
        this.getForUser = (req, res) => {
            const { username } = req.body;
            Status_1.default.find({ username: username }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(404).json([]);
                }
                else {
                    res.status(200).json(result);
                }
            });
        };
    }
}
exports.StatusController = StatusController;
//# sourceMappingURL=status.controller.js.map