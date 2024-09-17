
import mongoose from "mongoose"
import * as dotenv from "dotenv"
import {
    logColor
} from '../utils/index.js'
dotenv.config()
export default async function connectDB() {
    try {
        await mongoose.connect(process.env.URL_DB)   
        logColor.print('💾 Kết nối đến DATABASE thành công!', logColor.options.success.bgcolor)
      } catch (error) {
        logColor.print(`💾 Kết nối đến DATABASE thất bại, lỗi: ${error}`, logColor.options.error.bgcolor)
      }
} 

