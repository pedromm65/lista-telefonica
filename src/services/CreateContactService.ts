import { getCustomRepository } from "typeorm"

import { ContactsRepository } from "../repositories/ContactsRepository";

import { validatePhone } from "../utils/validatePhoneNumber"

interface IContactRequest {
  name: string;
  number: string;
  email: string
}


class CreateContactService {
    async execute({ name, number, email }: IContactRequest) {
      const contactsRepository = getCustomRepository(ContactsRepository)

      const checkIfPhoneNumberIsValid = validatePhone(number)
     
      if (!checkIfPhoneNumberIsValid) {
        throw new Error("Invalid format - digit ddd and phone number, ex: 11999999999")
      }
      const checkIfContactExistByEmail = await contactsRepository.findOne({ email })

      if (checkIfContactExistByEmail) {
        throw new Error("E-mail already registered")
      }

      const checkIfContactExistByNumber = await contactsRepository.findOne({ number })
      
      if (checkIfContactExistByNumber) {
        throw new Error("Number already registered")
      }


      const contact = contactsRepository.create({
        name, 
        number,
        email
      })

      await contactsRepository.save(contact)

      return contact
    }

}

export { CreateContactService }