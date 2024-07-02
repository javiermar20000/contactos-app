import React, { useState, useEffect, useRef } from 'react';
import ContactForm from './componentes/ContactForm';
import ContactList from './componentes/ContactList';
import SearchBar from './componentes/SearchBar';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
    showAlert('Contacto añadido con éxito');
  };

  const deleteContact = (index) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
  };

  const editContact = (index) => {
    setCurrentContact({ ...contacts[index], index });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateContact = (updatedContact) => {
    const updatedContacts = contacts.map((contact, i) =>
      i === currentContact.index ? updatedContact : contact
    );
    setContacts(updatedContacts);
    setIsEditing(false);
    setCurrentContact(null);
    showAlert('Contacto editado con éxito');
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortContacts = () => {
    const sorted = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
    setContacts(sorted);
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage('');
    }, 3000); // Ocultar la alerta después de 3 segundos
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Directorio de Contactos</h1>
      {alertMessage && (
        <div className="alert alert-success">
          {alertMessage}
        </div>
      )}
      <div ref={formRef} className="d-flex justify-content-between align-items-center mb-4">
        <ContactForm
          addContact={addContact}
          isEditing={isEditing}
          currentContact={currentContact}
          updateContact={updateContact}
        />
        <button className="btn btn-secondary ml-2" onClick={sortContacts}>
          Ordenar por Nombre
        </button>
      </div>
      <SearchBar setSearchTerm={setSearchTerm} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} editContact={editContact} />
    </div>
  );
};

export default App;
