"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMobile = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function auth(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token || token === '')
            return res.json({ error: 'Unauthorised request' });
        const verified = jsonwebtoken_1.default.verify(token, process.env.SESSION_SECRET ?? '');
        if (verified.username) {
            req.username = verified.username;
            next();
        }
    }
    catch (error) {
        res.json({ error: 'Unauthorised request' });
    }
}
exports.auth = auth;
function authMobile(req, res, next) {
    try {
        const token = req.body.token;
        if (!token || token === '')
            return res.status(401);
        const verified = jsonwebtoken_1.default.verify(token, process.env.SESSION_SECRET ?? '');
        if (verified.username) {
            req.username = verified.username;
            next();
        }
    }
    catch (error) {
        res.status(401).send();
    }
}
exports.authMobile = authMobile;
//# sourceMappingURL=authentication.js.map