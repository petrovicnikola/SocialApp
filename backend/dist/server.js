"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const status_router_1 = __importDefault(require("./routers/status.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://127.0.0.1:27017/social_app');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connection sucessfull');
});
app.use('/uploads', express_1.default.static('uploads'));
const router = express_1.default.Router();
app.use('/', router);
app.use('/users', user_router_1.default);
app.use('/statuses', status_router_1.default);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map