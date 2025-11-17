const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');

//  init app & middleware
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// db connection
let db;
connectToDb((err) => {
    if (!err) {
        console.log('Connected to database');
        app.listen(PORT , () => {
            console.log(`Server started on port ${PORT}`);
        });
        db = getDb();   

    } else {
        console.log('Database connection failed');
    }
});


// routes
app.get('/books', (req, res) => {
    const page = req.query.p || 0;
    const booksPerPage = 4;

    if (page < 0) {
        return res.status(400).json({ message: 'Page number must be 0 or greater.' });
    }

    db.collection('books')
    .find()
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .sort({ author: 1 })
    .toArray()
    .then((books) => {
        res.status(200).json(books);
    })
    .catch(() => {
        res.status(500).json({ message: 'Could not fetch books.' });
    });
});

app.get('/books/:id', (req, res) => {  

    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid book ID.' });
    }

    const bookId = req.params.id;

    db.collection('books')
    .findOne({ _id: new ObjectId(bookId)})
    .then(document => {
        if (!document) {
            return res.status(404).json({ message: 'Book not found.' });
        }
        res.status(200).json(document);
    })
    .catch(() => {
        res.status(500).json({ message: 'Could not fetch book.' }); 
    });  
});

app.post('/books', (req, res) => {
    const book = req.body;

    db.collection('books')
    .insertOne(book)
    .then(result => {
        res.status(201).json({ message: 'Book added successfully.', book: { ...book, _id: result.insertedId } });
    })
    .catch(() => {
        res.status(500).json({ message: 'Could not add book.' });
    });
});

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;

    if (!ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: 'Invalid book ID.' });
    }

    db.collection('books')
    .deleteOne({ _id: new ObjectId(bookId) })
    .then(() => {
        res.status(200).json({ message: 'Book deleted successfully.' });
    })
    .catch(() => {
        res.status(500).json({ message: 'Could not delete book.' });
    });
});

app.patch('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const updates = req.body;

    if (!ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: 'Invalid book ID.' });
    }

    db.collection('books')
    .updateOne({ _id: new ObjectId(bookId) }, { $set: updates })
    .then(() => {
        res.status(200).json({ message: 'Book updated successfully.' });
    })
    .catch(() => {
        res.status(500).json({ message: 'Could not update book.' });
    });

});