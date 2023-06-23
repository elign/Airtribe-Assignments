# Task Manager API

Built a RESTful API for a simple task manager application.

## Getting Started

To get started with this project, you need to:

1. Clone the repository to your local machine.
2. Install the dependencies.
```bash
> npm install
```
3. Run the project.
```bash
> node index.js
```

## Usage

To use this project, you can:

* GET /tasks: Retrieve all tasks.

* GET /tasks/:id: Retrieve a single task by its ID.

* POST /tasks: Create a new task.

* PUT /tasks/:id: Update an existing task by its ID.

* DELETE /tasks/:id: Delete a task by its ID.

## Structure of Message to be sent in Body

```json
    {
        "title": "new task",
        "description": "sample description",
        "completed": true,
    }
```
> **Note :** *You don't need to send any id in the body, it will be generated automatically in the backend*

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or feedback, please contact me at harshitshivam001@gmail.com
