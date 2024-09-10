const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // To parse incoming JSON data
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.static('public')); // Serve static files (HTML, JS)

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student_tasks', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Task Schema
const taskSchema = new mongoose.Schema({
    courseId: mongoose.Schema.Types.ObjectId,
    taskName: String,
    dueDate: Date,
    details: String
});

// Task Model
const Task = mongoose.model('Task', taskSchema);

// POST route for adding tasks
app.post('/tasks', async (req, res) => {
    const { courseId, taskName, dueDate, details } = req.body;

    try {
        const newTask = new Task({
            courseId: mongoose.Types.ObjectId(courseId),
            taskName,
            dueDate: new Date(dueDate),
            details
        });

        await newTask.save();
        res.status(201).json({ message: 'Task added successfully', task: newTask });
    } catch (err) {
        res.status(500).json({ message: 'Error adding task', error: err.message });
    }
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
