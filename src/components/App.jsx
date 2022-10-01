import { Component } from "react";
import { nanoid } from "nanoid";
import ContactsItem from 'components/ContactsItem/ContactsItem.jsx';
import FormAddPhone from 'components/FormAddPhone/FormAddPhone.jsx';
import Filter from "components/Filter/Filter.jsx";
import css from 'components/App.module.css'
import PropTypes from "prop-types";

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
   
  }

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts?.length) {
      console.log(contacts);
      this.setState({
      contacts,
    })
    }
    
    
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    console.log('prevProps', prevProps);
    console.log('prevState', prevState);
    const { contacts } = this.state;
    
    if (prevState.contacts !== contacts) {
    console.log('kjgfds');
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
  }

  addContact = (contact) => {
     if (this.isCopy(contact)) {
        return alert(`${contact.name} is already in contacts`);
    }
    const newContact = {
      id: nanoid(),
      ...contact
    }
    this.setState((prev) => {
      return {
        contacts: [...prev.contacts, newContact]
      }
    })
  }

    isCopy({ name }) {
    const { contacts } = this.state;
    const result = contacts.find((item) => item.name=== name);
    return result;
  }

  handelChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

    removeContact = (id) => {
    this.setState((prev) => {
      const newContacts = prev.contacts.filter((contact) => contact.id !== id);
      return {
        contacts: newContacts
      }
      })
    }
   


  getFilterContacts() {
    const { contacts, filter } = this.state;

    if (!filter) {
      return contacts;
    }
    const registerFilter = filter.toLocaleLowerCase();
    const filterContacts = contacts.filter(({ name }) => {
      const registerName = name.toLocaleLowerCase();
      const result = registerName.includes(registerFilter);
      return result;
    })

    return filterContacts;
}



  render() {
    const { addContact, handelChange,  removeContact } = this;
    const { filter } = this.state;
    const contacts = this.getFilterContacts();

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101'
        }}
      >
        
        <h2 className={css.title}>Phonebook</h2>
        <FormAddPhone onSubmit={addContact} />
        <Filter filter={filter} handelChange={handelChange} />
        <h2 className={css.title}>Contacts</h2>
        <ContactsItem items={contacts} removeContact={removeContact}/>
      </div>
    );
  };
}

App.propTypes = {

    contacts: PropTypes.array,
    filter: PropTypes.string,
    
}