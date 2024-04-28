import React, { useState } from "react";
import style from "./TodoItem.module.css";

const TodoItem = (props) => {
  const [completed, isCompleted] = useState(false);
  const [task, setTask] = useState({ id: props.id, title: props.title });

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
              onClick={() => isCompleted(true)}
              className={`btn btn-info ${style.itemBtn} rounded-circle`}
            >
              <i className="fa-solid fa-check text-white"></i>
            </button>
          )}
          <button
            onClick={() => setTask(null)}
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
