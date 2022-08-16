import { ADMIN_PORT, HOST } from "../common/config/config"
import { connectionMongodb } from "../common/db/connection"
import { BaseResponse } from "../common/reporter/base.response"
import roleRouter from "./router/role.route"
import employeeRouter from "./router/employee.router"
import classRouter from "./router/class.router"
import subjectRouter from "./router/subject.router"
import chapterRouter from "./router/chapter.router"
import topicRouter from "./router/topic.router"
import testRouter from "./router/test.router"
import questionRouter from './router/question.router'
import newsRouter from './router/news.router'
import messageRouter from './router/message.router'

const express = require("express")

async function connectDB() {
    const app = express()
    app.use(express.json())

    await connectionMongodb()

    app.use('/roles', roleRouter)
    app.use('/employee', employeeRouter)
    app.use('/class', classRouter)
    app.use('/subject', subjectRouter)
    app.use('/chapter', chapterRouter)
    app.use('/topic', topicRouter)
    app.use('/test', testRouter)
    app.use('/question', questionRouter)
    app.use('/news', newsRouter)
    app.use('/message', messageRouter)

    app.use((error: any, request: any, response: any, next: Function) => {
        console.log(error.message)
        if (error instanceof BaseResponse) {
            response.status(400).send(error)
        }
        else response.status(400).send(BaseResponse.UnknownError(error))
    })
    app.use((req, res) => res.status(404).send(BaseResponse.NotFound({ "URL": req.url })))
    app.listen(ADMIN_PORT, HOST, () => console.log("succsessfully connected on port", ADMIN_PORT))
}

connectDB()

