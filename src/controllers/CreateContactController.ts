import { Request, Response } from "express";
import { ContactService } from "../services/ContactService";
import "express-async-errors"

const contactService = new ContactService()

class ContactController {
  async CreateContact(request: Request, response: Response) {
    const { number, name, email } = request.body

    const contact = await contactService.CreateContact({
      number,
      name,
      email,
    })

   
    return response.json(contact)
  }

  async UpdateContact(request: Request, response: Response) {
    const { id } = request.params
    const newContact = contactService.UpdateContact(request.body, id)

    return response.json(newContact)
  }
  
  async ShowAllContacts(request: Request, response: Response) {
    const allContacts = await contactService.ShowAllContacts()

    return response.json(allContacts)
  }

  async DeleteContact(request: Request, response: Response) {
    const { id } = request.params
    await contactService.DeleteContacts(id)

    return response.send()

  }


}

export { ContactController }