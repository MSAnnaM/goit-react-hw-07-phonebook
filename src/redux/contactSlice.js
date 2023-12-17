import { createSlice } from '@reduxjs/toolkit';
import { fetchAllContacts, addNewContact, deleteContact } from './api';

const pendingHandle = state => {
  state.isLoading = true;
  state.error = null;
};

const rejectedHandle = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const fulfilledContacts = (state, { payload }) => {
  state.isLoading = false;
  state.items = payload;
};
const fulfilledAddContact = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items.push(payload);
};
const fulfilledDeleteContact = (state, { payload }) => {
  const deleteContactId = payload.id;
  state.items = state.items.filter(contact => contact.id !== deleteContactId);
  state.isLoading = false;
  state.error = null;
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllContacts.fulfilled, fulfilledContacts)
      .addCase(fetchAllContacts.pending, pendingHandle)
      .addCase(fetchAllContacts.rejected, rejectedHandle)
      .addCase(addNewContact.fulfilled, fulfilledAddContact)
      .addCase(addNewContact.pending, pendingHandle)
      .addCase(addNewContact.rejected, rejectedHandle)
      .addCase(deleteContact.fulfilled, fulfilledDeleteContact)
      .addCase(deleteContact.pending, pendingHandle)
      .addCase(deleteContact.rejected, rejectedHandle);
  },
});

export const contactReducer = contactSlice.reducer;
