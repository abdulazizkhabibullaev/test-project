import dotenv from "dotenv";
dotenv.config()
const { env } = process;   

export const ADMIN_PORT = env.ADMIN_PORT
export const USER_PORT = env.USER_PORT
export const HOST = env.HOST || "0.0.0.0";
export const DB_URL = env.DB_URL
export const TOKEN_KEY = env.TOKEN_KEY || "SECRET_KEY"
export const UPLOAD_PORT = env.FILES_PORT
