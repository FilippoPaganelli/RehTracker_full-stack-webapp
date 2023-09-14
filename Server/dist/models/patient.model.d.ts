import { Model } from 'mongoose';
interface Patient {
    fullName: string;
    age: number;
    username: string;
    password: string;
}
interface PatientMethods {
    comparePassword(password: string, callback: (error: any, isMatch: boolean) => void): boolean;
}
type PatientModel = Model<Patient, {}, PatientMethods>;
export declare const Patient: PatientModel;
export {};
//# sourceMappingURL=patient.model.d.ts.map