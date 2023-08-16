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

export default statusRouter;