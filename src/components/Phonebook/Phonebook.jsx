import  { useState, useEffect } from "react";
import PhonebookAdd from "./PhonebookAdd";
import Contactlist from "./Contactlist";
import Filter from "./Filter";
import { nanoid } from "nanoid";
import Notiflix from "notiflix";
import css from "./Phonebook.module.css";

export default function Phonebook() {
    const [contacts, setContacts] = useState(() => {
    const value = JSON.parse(localStorage.getItem('contacts'));
        return value ?? [];
    });
    const [filter, setFilter] = useState("");

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts])

const addContact = (contact) => {
    if (isDublicate(contact)){
    return Notiflix.Notify.warning(`${contact.name} or ${contact.number} is already in contact`)
    }

    setContacts((prev) => {
        const newContact = {
        id: nanoid(),
        ...contact
        }
        return [...prev, newContact]
        })
    }
    
const removeContact = (id) => {
        setContacts((prev) => {
        const newContacts = prev.filter((item) => item.id !== id);
        return newContacts
        })
    }
    
const changeFilter =  value => {
     setFilter(value);
        };
    
const isDublicate = ({name, number}) => {
        return contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase() || contact.number.toLowerCase() === number.toLowerCase());
    }

    
const getFilteredContacts = () => {
        if(!filter) {
        return contacts;
    }
    
        const normalizedFilter = filter.toLocaleLowerCase();
        const filteredContacts = contacts.filter(({ name, number }) => {
        const normalizedName = name.toLocaleLowerCase();
        const normalizedNumber = number.toLocaleLowerCase();
        const result = normalizedName.includes(normalizedFilter) || normalizedNumber.includes(normalizedFilter);
        return result;
        })
    
        return filteredContacts;
    }

const filteredContacts = getFilteredContacts(); 

    return (
        <div className={css.container}>
        <div className={css.phonebook}>
            <h2>Phoneboook</h2>
            <PhonebookAdd onSubmit={addContact}/>
        </div>
         {contacts.length > 0 ? 
        <div className={css.contacts}>
            <h2>Contacts</h2>
            <Filter value={filter} onChangeFilter={changeFilter} />
            <Contactlist items={filteredContacts} removeContact={removeContact}/>
          </div>: (
        <p >Don't have contacts...</p>
      )}
        </div>
    )
}