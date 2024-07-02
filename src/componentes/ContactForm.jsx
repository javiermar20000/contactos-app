import React, { useState, useEffect } from 'react';

const ContactForm = ({ addContact, isEditing, currentContact, updateContact }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (isEditing) {
      setName(currentContact.name);
      setEmail(currentContact.email);
      setPhone(currentContact.phone);
    }
  }, [isEditing, currentContact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const phoneRegex = /^\+569\d{8}$/;
    if (!phoneRegex.test(phone)) {
      alert('El número de teléfono debe ser chileno y seguir el formato +569XXXXXXXX');
      return;
    }

    const newContact = { name, email, phone };
    if (isEditing) {
      updateContact(newContact);
    } else {
      addContact(newContact);
    }

    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center">
      <div className="form-group mr-2">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group mr-2">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group mr-2">
        <input
          type="text"
          className="form-control"
          placeholder="Teléfono (+569XXXXXXXX)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {isEditing ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
};

export default ContactForm;