import { IOtpRepository } from "./interface/IOtpRepository";
import { IOtp } from "../types/otp";
import { BaseRepository } from "./baseRepository";
import { OtpModel } from "../model/otpModel";
import { Types } from "mongoose";

export class OtpRepository extends BaseRepository<IOtp>  implements IOtpRepository  {

    constructor() { 
        super(OtpModel)
    }

    async findByEmail(email: string): Promise<IOtp[] | []> {
        return await OtpModel.find({ email });
    }

    async increaseAttemptsById(id: Types.ObjectId): Promise<IOtp | null> {
        return await OtpModel.findByIdAndUpdate(id, { $inc: { attempts: 1 } })
    }


}