"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const status_controller_1 = require("../controllers/status.controller");
const statusRouter = express_1.default.Router();
statusRouter.route('/new').post((req, res) => {
    (new status_controller_1.StatusController()).newStatus(req, res);
});
statusRouter.route('').get((req, res) => {
    (new status_controller_1.StatusController()).getAll(req, res);
});
statusRouter.route('/like').post((req, res) => {
    (new status_controller_1.StatusController()).like(req, res);
});
exports.default = statusRouter;
//# sourceMappingURL=status.router.js.map