"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exercise = void 0;
const mongoose_1 = require("mongoose");
const exerciseSchema = new mongoose_1.Schema({
    username: {
        type: String,
        require: true,
    },
    timestamp: {
        type: Date,
        required: true,
        default: new Date(),
    },
    type: {
        type: Number,
        required: true,
    },
    currentSet: {
        type: Number,
        required: true,
        default: 1,
    },
    repetitionInSet: {
        type: Number,
        required: true,
        default: 0,
    },
    therapyId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    collection: 'exercises',
});
exports.Exercise = (0, mongoose_1.model)('Exercise', exerciseSchema);
//# sourceMappingURL=exercise.model.js.map