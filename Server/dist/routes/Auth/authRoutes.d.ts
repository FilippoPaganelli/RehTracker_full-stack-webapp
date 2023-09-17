import * as jwt from 'jsonwebtoken';
declare module 'jsonwebtoken' {
    interface SignedInJwtPayload extends jwt.JwtPayload {
        username: string | null;
    }
}
export declare const signedIn: (req: any, res: any) => void;
export declare const signOut: (req: any, res: any) => void;
export declare const signIn: (req: any, res: any) => Promise<void>;
export declare const signUp: (req: any, res: any) => Promise<void>;
export declare const mobileSignedIn: (req: any, res: any) => void;
//# sourceMappingURL=authRoutes.d.ts.map