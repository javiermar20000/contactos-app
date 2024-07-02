import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ContactList = ({ contacts, deleteContact, editContact }) => {
  return (
    <div className="row">
      {contacts.map((contact, index) => (
        <div className="col-md-4 mb-3" key={index}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{contact.name}</h5>
              <p className="card-text">Email: {contact.email}</p>
              <p className="card-text">Teléfono: {contact.phone}</p>
              <button onClick={() => editContact(index)} className="btn btn-warning mr-2">
                <FaEdit />
              </button>
              <button onClick={() => deleteContact(index)} className="btn btn-danger">
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;