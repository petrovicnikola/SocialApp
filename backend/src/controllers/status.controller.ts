import * as express from 'express';
import Status from '../models/Status';
import { ObjectId } from 'mongodb';

export class StatusController {
    newStatus = (req: express.Request, res: express.Response) => {
        const { username, text } = req.body;

        const status = new Status({username, text});
        status.save().then((status) => {
            res.status(200).json({message: 'ok'});
        }).catch((err) => {
            res.status(404).json({message: 'notOk'});
        });
    }

    getAll = async (req: express.Request, res: express.Response) => {
        const statuses = await Status.find({}).sort({createdAt: -1});

        if (!statuses)
            res.json(404).json({message: 'notOk'});
        else
            res.status(200).json(statuses);
    }

    like = (req: express.Request, res: express.Response) => {
        const { username, _id } = req.body;

        const objId = new ObjectId(_id);

        Status.findOne({_id: objId, likedBy: username}, (err, status) => {
            if (status){
                Status.updateOne({_id: objId}, {$pull: {likedBy: username}}).then((result) => {
                    if (result.modifiedCount === 1){
                        Status.findOne({_id: objId}, (err, status) => {
                            if (err){
                                console.log(err);
                                res.status(404).json({});
                            }
                            else {
                                res.status(200).json(status.likedBy);
                            }
                        })
                    }
                })
            }
            else {
                Status.updateOne({_id: objId}, {$push: {likedBy: username}}).then((result) => {
                    if (result.modifiedCount === 1){
                        Status.findOne({_id: objId}, (err, status) => {
                            if (err){
                                console.log(err);
                                res.status(404).json({});
                            }
                            else {
                                res.status(200).json(status.likedBy);
                            }
                        })
                    }
                })
            }
        })
    }
}