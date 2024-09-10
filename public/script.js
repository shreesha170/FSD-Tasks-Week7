document.getElementById('taskForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the form from reloading the page

    const taskData = {
        courseId: document.getElementById('courseId').value,
        taskName: document.getElementById('taskName').value,
        dueDate: document.getElementById('dueDate').value,
        details: document.getElementById('details').value
    };

    try {
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData) // Send the form data as JSON
        });

        if (response.ok) {
            alert('Task added successfully!');
            document.getElementById('taskForm').reset(); // Clear the form
        } else {
            alert('Error adding task!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the task.');
    }
});
