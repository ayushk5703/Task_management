import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Task } from "./models/TaskManagment.js";
import cors from "cors";


const app = express();
const router = express.Router()

router.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
}),
app.use(express.json());

app.use(cors());
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to the mernstack project");
});
//Route for save new task
app.post("/tasks", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.description ||
      !request.body.duedate
    ) {
      return response
        .status(400)
        .send({ message: "Send all required fields: title, author, deuedate" });
    }
    const newtask = {
      title: request.body.title,
      description: request.body.description,
      duedate: request.body.duedate,
    };
    const task = await Task.create(newtask);

    return response.status(201).send(task);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
//Route for Get all Tasks from the database
app.get("/tasks", async (request, response) => {
  try {
    const tasks = await Task.find({});

    return response.status(200).json({
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for Get one book from the is
app.get("/tasks/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const task = await Task.find({});

    return response.status(200).json(task);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for Update a Task
app.put("/tasks/get/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.description ||
      !request.body.duedate
    ) {
      return response
        .status(400)
        .send({ message: "Send all required fields: title, author, deuedate" });
    }

    const { id } = request.params;
    const result = await Task.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Task not Found" });
    }
    return response.status(200).send({ message: "Task Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
//Route for delete a book

app.delete("/tasks/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Task.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not Found" });
    }
    return response.status(200).send({ message: "Book deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
