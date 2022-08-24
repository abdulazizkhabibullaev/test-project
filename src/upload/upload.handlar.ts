import path from "path";
import { BaseResponse } from "../common/reporter/base.response";
const multer = require("multer");

export async function uploadFileHandler(req, res, next) {
    try {
        console.log('file uploaded succesfully')
        return res.send(BaseResponse.Success(req.file.path))
    } catch (error) {
        return next(error)
    }
}