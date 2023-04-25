import React, { Component } from "react";
import PhonebookAdd from "./PhonebookAdd";
import Contactlist from "./Contactlist";
import Filter from "./Filter";
import { nanoid } from "nanoid";
import Notiflix from "notiflix";
import css from "./Phonebook.module.css";

export default class Phonebook extends Component {
    state = {
        contacts: [
            {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
            {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
        ],
        filter: '',
      }

    componentDidMount() {
    // берем данные из  localStorage
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    //если есть парсим и запивываем
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
      const prevContacts = prevState.contacts;
      
    //Если контакты изменились записуем их в localStorage
      
    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

addContact = (contact) => {
    if (this.isDublicate(contact)){
    return Notiflix.Notify.warning(`${contact.name} - ${contact.number} is already in contact`)
    }
    this.setState((prev) => {
    const newContact = {
    id: nanoid(),
    ...contact
    }
    return {
    contacts: [...prev.contacts, newContact]
    }
    })
}

removeContact = (id) => {
    this.setState((prev) => {
    const newContacts = prev.contacts.filter((item) => item.id !== id);
    return {
    contacts: newContacts
    }
    })
}

changeFilter = (filter) => {
    this.setState({ filter });
  };

isDublicate({name, number}) {
    const { contacts } = this.state;
    const result = contacts.find((item) => item.name === name && item.number === number);
    return result;
}

getFilteredContacts() {
    const { contacts, filter } = this.state;
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

    render() {
        const { addContact, removeContact, changeFilter } = this;
        const { filter } = this.state;
        const contacts = this.getFilteredContacts();
        return (
            <div className={css.container}>
            <div className={css.phonebook}>
                <h2>Phoneboook</h2>
                <PhonebookAdd onSubmit={addContact}/>
            </div>
            <div className={css.contacts}>
                <h2>Contacts</h2>
                <Filter value={filter} onChangeFilter={changeFilter} />
                <Contactlist items={contacts} removeContact={removeContact}/>
            </div>
            </div>
        )
    }
}
