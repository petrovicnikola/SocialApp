import * as express from 'express';
import User from '../models/User';
import * as path from 'path';

export class UserController {
    register = (req: express.Request, res: express.Response) => {
        const {username, password, name, surname, email} = req.body;

        User.findOne({username: username}, (err, user) => {
            if (user){
                res.status(404).json({'message': 'exists'});
                return;
            }
            else {
                User.findOne({email: email}, (err, user) => {
                    if (user){
                        res.status(404).json({'message': 'exists'});
                        return;
                    }
                    else {
                        const newUser = new User({username, password, name, surname, email, gender: '', bio: ''});
                        newUser.save().then(user => {
                            res.status(200).json({message : "ok"});
                        }).catch(err => {
                            res.json({message: err});
                        });
                    }
                })
            }
        })
    }

    login = (req: express.Request, res: express.Response) => {
        const { username, password } = req.body;

        User.findOne({username: username, password: password}, (err, user) => {
            if (err) {
                res.status(404).json({message: 'An error occured.'});
            }
            else {
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({message: 'User not found!'});
                }
            }
        })
    }

    upload = (req: express.Request, res: express.Response) => {
        const { username } = req.body;
        const file = req['file'];

        if (!file) {
            res.status(400).json({ message: 'No file provided' });
            return;
        }

        User.findOne({username: username}, (err, user) => {
            if (err){
                console.log(err);
                res.status(404).json({});
            }
            else {
                user.photo = path.join('uploads', file.filename);
                user.save().then(() => {
                    res.status(200).json({filename: file.filename});
                });
            }
        })
    }
}