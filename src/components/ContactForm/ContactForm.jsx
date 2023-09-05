import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  InputBlock,
  InputName,
  NewContactValue,
  AddContact,
} from './ContactForm.styled';

export default function ContactForm({ addContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    addContact(name, number);

    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputBlock>
        <InputName>Name:</InputName>
        <NewContactValue
          type="text"
          name="name"
          value={name}
          // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleInputChange}
        />
      </InputBlock>

      <InputBlock>
        <InputName>Number:</InputName>
        <NewContactValue
          type="tel"
          name="number"
          value={number}
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleInputChange}
        />
      </InputBlock>

      <AddContact>Add contact</AddContact>
    </Form>
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func,
};
