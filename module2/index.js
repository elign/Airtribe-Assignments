const express = require("express");
var bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());
const port = 3000;

// Retrieve all tasks
app.get("/tasks", (req, res) => {
  fs.readFile("tasks.json", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.log(err);
      res.send("Data not found!");
    }
    res.status(200).send(data);
  });
});

// Retrieve a single task by its ID
app.get("/tasks/:id", (req, res) => {
  fs.readFile("tasks.json", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.log(err);
      res.send("Data not found!");
    }
    const obj = JSON.parse(data);
    const ans = obj.filter((val) => val.id === req.params.id);
    res.status(200).send(ans);
  });
});

// Create a new task
app.post("/tasks", (req, res) => {
  fs.readFile("tasks.json", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.log(err);
      res.send("Request could not be executed!");
    }
    const obj = JSON.parse(data);
    const newVal = req.body;

    if (newVal?.title && newVal?.description && newVal?.completed != undefined && typeof(newVal.completed) == "boolean") {
      newVal.id = obj.length + 1;
      obj.push(newVal);

      fs.writeFile("tasks.json", JSON.stringify(obj), "utf8", (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("File has been written successfully.");
        res.send("Task added successfully");
      });

    } else {
        res.send("information is not complete")
    }
  });
});


// Update and Existing Task
app.put("/tasks/:id", (req, res) => {
  fs.readFile("tasks.json", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.log(err);
      res.send("Request could not be executed!");
    }
    const obj = JSON.parse(data);
    const newVal = req.body;

    if (newVal?.title && newVal?.description && newVal?.completed != undefined && typeof(newVal.completed) == "boolean") {
      
      if(req.params.id > obj.length || req.params.id < 0) {
        res.send("Invalid Id")
      }
      newVal.id = req.params.id;
      obj.push(newVal);

      fs.writeFile("tasks.json", JSON.stringify(obj), "utf8", (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("File has been written successfully.");
        res.send("Task added successfully");
      });

    } else {
        res.send("information is not complete")
    }
  });
})

app.delete("/tasks/:id", (req, res) => {
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
