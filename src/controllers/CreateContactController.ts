import { Request, Response } from "express";
import { ContactService } from "../services/ContactService";
import "express-async-errors"


class ContactController {
  async CreateContact(request: Request, response: Response) {
    const { number, name, email } = request.body

    const createContactService = new ContactService()

    const contact = await createContactService.execute({
      number,
      name,
      email
    })

    console.log(contact)
    return response.json(contact)
  }
}

export { ContactController }