import { Router } from "express"
import multer from 'multer'
import path from 'path'
import { uploadFileHandler } from "./upload.handlar"
import { v4 as uuidv4 } from 'uuid'

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join("uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4()+path.extname(file.originalname));
    },
});

const upload = multer({storage: storage})

router.post("/file", upload.single('file'), uploadFileHandler)

export default router;