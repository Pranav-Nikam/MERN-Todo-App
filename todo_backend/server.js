const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/TODO', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('Connection error', err);
});

app.use('/auth', authRoutes);

app.listen(5000, () => {
    console.log('Server listening on port: 5000');
});

app.post('/add', async (req, res) => {
    try {
        const { task } = req.body;
        const result = await TodoModel.create({ task });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/get', async (req, res) => {
    try {
        const result = await TodoModel.find();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await TodoModel.findByIdAndUpdate(id, { done: true }, { new: true });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { task } = req.body;
        const result = await TodoModel.findByIdAndUpdate(id, { task }, { new: true });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await TodoModel.findByIdAndDelete(id);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = app;
