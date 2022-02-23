import { Request, Response } from "express";
import { CreateContactService } from "../services/CreateContactService";
import "express-async-errors"


class CreateContactController {
  async handle(request: Request, response: Response) {
    const { number, name, email } = request.body

    const createContactService = new CreateContactService()

    const contact = await createContactService.execute({
      number,
      name,
      email
    })

    console.log(contact)
    return response.json(contact)
    
  }
}

export { CreateContactController }