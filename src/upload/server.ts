import express from "express"
import { UPLOAD_PORT, HOST } from "../common/config/config";
const multer = require('multer')
import fileRouter from "./upload.router"
import { BaseResponse } from "../common/reporter/base.response";
import path from "path";

!async function () {
    const server = express();

    server.use(express.json())

    //router
    server.use(fileRouter)

    ///error url
    server.use((req, res) => {
        res.status(404).send(BaseResponse.NotFound({ "URL": req.url }))
    })

    //error handler
    server.use((err, req, res, next) => {
        console.log(err.message)

        if (err instanceof BaseResponse) {
            res.status(400).send(err)
        }
        else res.status(400).send(BaseResponse.UnknownError(err))
    })
    server.listen(UPLOAD_PORT, HOST, () => {
        console.log("Upload server running on http://localhost:" + UPLOAD_PORT)
    })
}()