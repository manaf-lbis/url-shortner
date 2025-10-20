import { Types } from "mongoose";
import { IOtp } from "../../types/otp";
import { IBaseRepository } from "./IBaseRepository";

export interface IOtpRepository  extends IBaseRepository<IOtp> {
    findByEmail(email: string): Promise<IOtp[] | []> ;
    increaseAttemptsById(id:Types.ObjectId): Promise<IOtp | null>;
}