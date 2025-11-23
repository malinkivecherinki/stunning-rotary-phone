// PhoneBook API - Contact management REST API
const express = require('express');
const app = express();

app.use(express.json());

class PhoneBook {
    constructor() {
        this.contacts = [];
    }
    
    addContact(name, phone, email) {
        const contact = { id: this.contacts.length + 1, name, phone, email };
        this.contacts.push(contact);
        return contact;
    }
    
    getContact(id) {
        return this.contacts.find(c => c.id === id);
    }
    
    getAllContacts() {
        return this.contacts;
    }
    
    search(query) {
        return this.contacts.filter(c => 
            c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.phone.includes(query) ||
            c.email.toLowerCase().includes(query.toLowerCase())
        );
    }
}

const phoneBook = new PhoneBook();

app.post('/api/contacts', (req, res) => {
    const { name, phone, email } = req.body;
    res.json(phoneBook.addContact(name, phone, email));
});

app.get('/api/contacts', (req, res) => {
    if (req.query.q) {
        res.json(phoneBook.search(req.query.q));
    } else {
        res.json(phoneBook.getAllContacts());
    }
});

app.get('/api/contacts/:id', (req, res) => {
    const contact = phoneBook.getContact(parseInt(req.params.id));
    if (contact) {
        res.json(contact);
    } else {
        res.status(404).json({ error: 'Contact not found' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`PhoneBook API running on port ${PORT}`);
});

module.exports = { PhoneBook, app };
