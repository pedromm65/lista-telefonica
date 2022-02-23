import { getConnection, getCustomRepository } from "typeorm"

import { ContactsRepository } from "../repositories/ContactsRepository";

import { validatePhone } from "../utils/validatePhoneNumber"

import { Contact } from "../entities/Contact";

interface IContactRequest {
  name: string;
  number: string;
  email: string;
}


class ContactService {
    async CreateContact({ name, number, email }: IContactRequest) {
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
        email,
      })

      await contactsRepository.save(contact)

      return contact
    }

    async UpdateContact({ name }, id: string) {
      await getConnection()
        .createQueryBuilder()
        .update(Contact)
        .set({
          name: name,
        })
        .where("id = :id", {id: id})
        .execute()
    }

    async ShowAllContacts() {
      const contactsRepository = getCustomRepository(ContactsRepository)

      return await contactsRepository.find()
    }

    async DeleteContacts(id: string) {

      await getConnection().createQueryBuilder()
        .delete()
        .from(Contact)
        .where("id = :id", { id: id })
        .execute()
    }

}

export { ContactService }