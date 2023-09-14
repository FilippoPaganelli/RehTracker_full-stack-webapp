"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Router_1 = require("./routes/Router");
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000'],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
const uri = process.env.MONGO_DB ?? process.env.ATLAS_DB_URI ?? '';
try {
    mongoose_1.default.connect(uri);
}
catch (error) {
    console.log(error);
}
mongoose_1.default.connection.once('open', () => {
    console.log('-DB: connected successfully');
});
app.use(Router_1.router);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('frontend/build'));
}
app.listen(PORT, () => {
    console.log(`-server: listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map