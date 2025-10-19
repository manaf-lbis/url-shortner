import mongoose,{Schema} from "mongoose";
import { IShortUrl } from "../types/shortUrl";


const shortUrlSchema = new Schema<IShortUrl>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    originalUrl:{
        type:String,
        required:true,
    },
    shortCode:{
        type:String,
        required:true,
        unique:true,    
    },
    clicksCount:{
        type:Number,
        default:0,
    },
    isActive:{
        type:Boolean,
        default:true,   
    },
    isDeleted:{
        type:Boolean,
        default:false,
    }

},{ timestamps: true})


export const ShortUrlModel = mongoose.model<IShortUrl>("ShortUrl",shortUrlSchema);