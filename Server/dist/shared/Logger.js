"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
exports.logger = (0, pino_1.default)({
    nestedKey: 'payload',
    base: undefined,
    level: 'debug',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        },
    },
});
process.on('uncaughtException', error => {
    exports.logger.error(error, 'UncaughtException');
    process.exit(1);
});
//# sourceMappingURL=Logger.js.map