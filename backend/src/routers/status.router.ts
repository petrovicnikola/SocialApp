import express from "express";
import { StatusController } from "../controllers/status.controller";

const statusRouter = express.Router();

statusRouter.route('/new').post(
    (req, res) => {
        (new StatusController()).newStatus(req, res);
    }
)

statusRouter.route('').get(
    (req, res) => {
        (new StatusController()).getAll(req, res);
    }
)

statusRouter.route('/like').post(
    (req, res) => {
        (new StatusController()).like(req, res);
    }
)

statusRouter.route('/getWithId').post(
    (req, res) => {
        (new StatusController()).getWithId(req, res);
    }
)

statusRouter.route('/comment').post(
    (req, res) => {
        (new StatusController()).comment(req, res);
    }
)

statusRouter.route('/getForUser').post(
    (req, res) => {
        (new StatusController()).getForUser(req, res);
    }
)

export default statusRouter;