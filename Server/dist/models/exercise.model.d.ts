/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Schema } from 'mongoose';
interface Exercise {
    username: string;
    timestamp: Date;
    type: number;
    currentSet: number;
    repetitionInSet: number;
    therapyId: string;
}
export declare const Exercise: import("mongoose").Model<Exercise, {}, {}, {}, import("mongoose").Document<unknown, {}, Exercise> & Exercise & {
    _id: import("mongoose").Types.ObjectId;
}, Schema<Exercise, import("mongoose").Model<Exercise, any, any, any, import("mongoose").Document<unknown, any, Exercise> & Exercise & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Exercise, import("mongoose").Document<unknown, {}, Exercise> & Exercise & {
    _id: import("mongoose").Types.ObjectId;
}>>;
export {};
//# sourceMappingURL=exercise.model.d.ts.map