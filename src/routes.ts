import express from "express";
import multer from "multer";
import { ContactController } from "./controllers/CreateContactController";


const routes = express.Router();



const createContactController = new ContactController()

routes.post("/contacts", createContactController.CreateContact)
routes.put("/contacts/:id", createContactController.UpdateContact)
routes.get("/contacts", createContactController.ShowAllContacts)
routes.delete("/contacts/:id", createContactController.DeleteContact)


export { routes }