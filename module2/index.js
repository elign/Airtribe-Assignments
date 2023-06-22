const express = require("express");
var bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.json());
const port = 3000;
const tasksFilePath = path.join(__dirname, "tasks.json");

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};

// Retrieve all tasks
app.get("/tasks", (req, res) => {
  fs.readFile(tasksFilePath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Data not found!");
      return;
    }

    try {
      const tasks = JSON.parse(data);
      res.status(200).json(tasks);
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to parse data!");
    }
  });
});

// Retrieve a single task by its ID
app.get("/tasks/:id", (req, res) => {
  fs.readFile("tasks.json", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Data not found!");
      return;
    }
    try {
      const tasks = JSON.parse(data);
      const task = tasks.find((val) => val.id === req.params.id);

      if (!task) {
        res.status(404).send("Task not found!");
        return;
      }

      res.status(200).json(task);
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to parse data!");
    }
  });
});

// Create a new task
app.post("/tasks", (req, res, next) => {
  fs.readFile(tasksFilePath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Request could not be executed!");
      return;
    }

    try {
      const tasks = JSON.parse(data);
      const newTask = req.body;

      if (
        newTask?.title &&
        newTask?.description &&
        newTask?.completed !== undefined &&
        typeof newTask.completed === "boolean"
      ) {
        newTask.id = uuidv4();
        tasks.push(newTask);

        fs.writeFile(tasksFilePath, JSON.stringify(tasks), "utf8", (err) => {
          if (err) {
            console.error(err);
            res.status(500).send("Failed to write file!");
            return;
          }

          console.log("File has been written successfully.");
          res.send("Task added successfully");
        });
      } else {
        res.send("Information is not complete");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to parse data!");
    }
  });
});

// Update and Existing Task
app.put("/tasks/:id", (req, res, next) => {
  fs.readFile(tasksFilePath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Request could not be executed!");
      return;
    }

    try {
      const tasks = JSON.parse(data);
      const newTask = req.body;
      newTask.id = req.params.id;

      if (
        newTask?.title &&
        newTask?.description &&
        newTask?.completed !== undefined &&
        typeof newTask.completed === "boolean"
      ) {
        const taskToUpdate = tasks.find((task) => task.id === req.params.id);

        if (taskToUpdate) {
          Object.assign(taskToUpdate, newTask);
          console.log("Value updated successfully.");
        } else {
          console.error("ID not found.");
          res.status(404).send("Invalid ID");
          return;
        }

        fs.writeFile(tasksFilePath, JSON.stringify(tasks), "utf8", (err) => {
          if (err) {
            console.error(err);
            res.status(500).send("Failed to write file!");
            return;
          }

          console.log("File has been written successfully.");
          res.send("Task updated successfully");
        });
      } else {
        res.send("Information is not complete");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to parse data!");
    }
  });
});

app.delete('/tasks/:id', (req, res) => {
    fs.readFile(tasksFilePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Request could not be executed!');
        return;
      }
  
      try {
        const tasks = JSON.parse(data);
        let objectIndexToDelete = -1;
  
        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i].id == req.params.id) {
            objectIndexToDelete = i;
          }
        }
  
        if (objectIndexToDelete !== -1) {
          tasks.splice(objectIndexToDelete, 1);
          console.log('Value deleted successfully.');
        } else {
          console.error('ID not found.');
          res.status(404).send('Invalid ID');
          return;
        }
  
        fs.writeFile(tasksFilePath, JSON.stringify(tasks), 'utf8', (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Failed to write file!');
            return;
          }
  
          console.log('File has been written successfully.');
          res.send('Value deleted successfully');
        });
      } catch (err) {
        console.error(err);
        res.status(500).send('Failed to parse data!');
      }
    });
  });
  
// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
