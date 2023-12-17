import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { Form, Input, Button } from './ContactForm.styled';
import Notiflix from 'notiflix';
import { selectContacts } from '../../redux/selectors';
import { addNewContact } from '../../redux/api';

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const arrContacts = contacts.items;
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = ({ target }) => {
    if (target.name === 'name') {
      setName(target.value);
    } else if (target.name === 'number') {
      setNumber(target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !number) {
      Notiflix.Notify.warning('Please write your name and number');
      return;
    }
    const isDuplicate = arrContacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      Notiflix.Notify.warning(`${name} is already in the contacts.`);
      return;
    }
   
    const newContact = {
        id: nanoid(),
        name,
        number,
      }
    dispatch(addNewContact(newContact))
    setName('');
    setNumber('');
  };


  return (
    <Form onSubmit={handleSubmit}>
      <label>
        <Input
          type="text"
          name="name"
          placeholder="Name:"
          value={name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        <Input
          type="tel"
          name="number"
          placeholder="Number:"
          value={number}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          onChange={handleInputChange}
        />
      </label>
      <Button type="submit">Add Contact</Button>
    </Form>
  );
};
