import { Component } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import { Box } from './Box/Box.styled';
import { NotFound } from './NotFound/NotFound.styled';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './Contacts/ListOfContacts';
import Filter from './SearchForm/SearchForm';

const INITIAL_STATE = {
  contacts: [],
  filter: '',
};

export class App extends Component {
  state = { ...INITIAL_STATE };

  addContact = newContact => {
    const { contacts } = this.state;
    if (
      contacts.some(contact => {
        return contact.name.toLowerCase() === newContact.name.toLowerCase();
      })
    ) {
      return toast(`${newContact.name} is already in your Book`, { icon: '❗' });
    }
    const id = nanoid();
    const newAddedContact = { id, ...newContact };
    this.setState(prevState => {
      return {
        contacts: [newAddedContact, ...prevState.contacts],
      };
    });
    return toast(`${newContact.name} was successfully added to your Book`, { icon: '✓' });
  };

  deleteContact = (id, name) => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
    return toast(`${name} was removed from your Book`, { icon: '✗' });
  };

  applyFilter = filter => this.setState({ filter });
  getFilteredList = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) => name.toLowerCase().includes(normalizedFilter));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const filteredList = this.getFilteredList();
    return (
      <Box>
        <Toaster />
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} onFormSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.applyFilter} />
        {filteredList.length > 0 && (
          <ContactList listContacts={filteredList} handleCLick={this.deleteContact} />
        )}
        {filter && filteredList.length === 0 && (
          <NotFound>No results found for "{filter}".</NotFound>
        )}
      </Box>
    );
  }
}
