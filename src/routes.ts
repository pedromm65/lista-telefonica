import express from "express";
import multer from "multer";
import { ContactController } from "./controllers/CreateContactController";
import uploadConfig from "./config/upload";
const routes = express.Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createContactController = new ContactController()

routes.post("/contacts", createContactController.CreateContact)


export { routes }