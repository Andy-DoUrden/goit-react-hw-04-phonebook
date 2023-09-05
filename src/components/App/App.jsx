import { useState, useEffect } from 'react';
import shortid from 'shortid';
import { Container, PhonebookContainer, Title, ListTitle } from './App.styled';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';

const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? defaultContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleTodos = () => {
    const normalizedFilterValue = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilterValue)
    );
  };

  const addContact = (name, number) => {
    const previousNames = contacts.map(contact => contact.name);

    if (previousNames.includes(name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const handleDeleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  // const filteredContacts = getVisibleTodos();

  return (
    <Container>
      <PhonebookContainer>
        <Title>Phonebook</Title>

        <ContactForm addContact={addContact} />

        <ListTitle>Contacts</ListTitle>

        <Filter value={filter} changeFilter={changeFilter} />

        <ContactList
          data={getVisibleTodos()}
          deleteContact={handleDeleteContact}
        />
      </PhonebookContainer>
    </Container>
  );
}
