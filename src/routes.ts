import express from "express";
import multer from "multer";
import { CreateContactController } from "./controllers/CreateContactController";
import uploadConfig from "./config/upload";
const routes = express.Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createContactController = new CreateContactController()

routes.post("/contacts", createContactController.handle)


export { routes }