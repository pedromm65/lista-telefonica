import { getCustomRepository } from "typeorm"

import { ContactsRepository } from "../repositories/ContactsRepository";

import { validatePhone } from "../utils/validatePhoneNumber"

interface IContactRequest {
  phoneNumber: string;
  name: string;
  email: string
}


class CreateContactService {
    async execute({ phoneNumber, name, email }: IContactRequest) {
      const contactsRepository = getCustomRepository(ContactsRepository)

      // const checkIfPhoneNumberIsValid = validatePhone(phoneNumber)
      console.log(phoneNumber)
      // if (!checkIfPhoneNumberIsValid) {
      //   throw new Error("Invalid format - ex: 11999999999")
      // }
      const checkIfContactExistByEmail = await contactsRepository.findOne({ email })
      console.log(email)
      console.log(name)
      if (checkIfContactExistByEmail) {
        throw new Error("E-mail already registered")
      }

      const checkIfContactExistByNumber = await contactsRepository.findOne({ phoneNumber })
      
      if (checkIfContactExistByNumber) {
        throw new Error("Number already registered")
      }


      const contact = contactsRepository.create({
        phoneNumber, 
        name, 
        email, 
      })

      await contactsRepository.save(contact)

      return contact
    }

}

export { CreateContactService }