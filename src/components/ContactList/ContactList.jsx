import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Item, ItemName, DeleteBtn } from './ContactList.styled';
import { selectContacts, selectFilter } from '../../redux/selectors';
import { useEffect } from "react";
import { fetchAllContacts } from '../../redux/api';
import { deleteContact } from '../../redux/api';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  let normalizedFilter = filter ? filter.toLowerCase() : '';
  const filteredContacts = contacts.items.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <List>
      {filteredContacts.map(contact => (
        <Item key={contact.id}>
          <ItemName>{contact.name}</ItemName>
          <span>{contact.phone}</span>
          <DeleteBtn onClick={() => handleDeleteContact(contact.id)}>
            Delete
          </DeleteBtn>
        </Item>
      ))}
    </List>
  );
};
