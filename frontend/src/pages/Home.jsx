import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle, BsPencilSquare, BsTrash } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/tasks")
      .then((response) => {
        setTasks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/tasks/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "15px" }}>
                No.
              </th>
              <th style={{ border: "1px solid black", padding: "15px" }}>
                Title
              </th>
              <th style={{ border: "1px solid black", padding: "15px" }}>
                Description
              </th>
              <th style={{ border: "1px solid black", padding: "15px" }}>
                duedate
              </th>
              <th style={{ border: "1px solid black", padding: "15px" }}>
                Action Center
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={tasks.id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {task.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {task.description}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {task.duedate}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/tasks/edit/${task.id}`}>
                      <BsPencilSquare className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/tasks/delete/${task.id}`}>
                      <BsTrash className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default Home;
