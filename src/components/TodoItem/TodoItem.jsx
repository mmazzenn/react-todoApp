import React, { useState, useContext } from "react";
import style from "./TodoItem.module.css";
import { TasksContext } from "../../Context/TasksContext";

const TodoItem = (props) => {
  const [completed, isCompleted] = useState(false);
  const [task, setTask] = useState({ id: props.id, title: props.title });
  const { finishTasks, setFinishTasks } = useContext(TasksContext);

  function storeCompletedTasks(id) {
    isCompleted(true);
    setFinishTasks([...finishTasks, id]);
  }

  function removeTask(id) {
    setTask(null);
    const newTasks = finishTasks.filter((task) => task !== id);
    setFinishTasks(newTasks);
  }

  return (
    task && (
      <div
        id={task.id}
        className="py-3 px-4 bg-dark text-white d-flex justify-content-between align-items-center rounded-4 mb-4 gap-3 flex-wrap"
      >
        <h5 className="mb-0">{task.title}</h5>
        <div className="d-flex align-items-center gap-2">
          {completed ? (
            <h5 className="mb-0 bg-success rounded-3 p-2">Completed</h5>
          ) : (
            <button
              onClick={() => storeCompletedTasks(task.id)}
              className={`btn btn-info ${style.itemBtn} rounded-circle`}
            >
              <i className="fa-solid fa-check text-white"></i>
            </button>
          )}
          <button
            onClick={() => {
              removeTask(task.id);
              setFinishTasks((prevFinishTasks) =>
                prevFinishTasks.filter((taskId) => taskId !== task.id)
              );
            }}
            className={`btn btn-danger ${style.itemBtn} rounded-circle`}
          >
            <i className="fa-solid fa-xmark text-white"></i>
          </button>
        </div>
      </div>
    )
  );
};

export default TodoItem;
