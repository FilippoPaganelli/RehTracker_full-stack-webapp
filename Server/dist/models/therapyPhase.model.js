"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TherapyPhase = void 0;
const mongoose_1 = require("mongoose");
const therapyPhaseSchema = new mongoose_1.Schema({
    username: {
        type: String,
        require: true,
    },
    exerciseTypes: {
        type: [Number],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
    collection: 'therapyphases',
});
exports.TherapyPhase = (0, mongoose_1.model)('TherapyPhase', therapyPhaseSchema);
//# sourceMappingURL=therapyPhase.model.js.map