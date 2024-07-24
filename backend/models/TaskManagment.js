import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const taskschema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duedate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Cat", taskschema);
