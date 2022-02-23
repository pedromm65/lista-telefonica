import express from "express";
import multer from "multer";
import { ContactController } from "./controllers/CreateContactController";
import uploadConfig from "./config/upload";
const routes = express.Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createContactController = new ContactController()

routes.post("/contacts", createContactController.CreateContact)
routes.put("/contacts/:id", createContactController.UpdateContact)
routes.get("/contacts", createContactController.ShowAllContacts)
routes.delete("/contacts/:id", createContactController.DeleteContact)

export { routes }