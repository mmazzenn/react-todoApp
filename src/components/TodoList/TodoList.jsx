import React, { useState, useEffect, useRef, useContext } from "react";
import TodoItem from "../TodoItem/TodoItem";
import style from "./TodoList.module.css";
import axios from "axios";
import { TasksContext } from "../../Context/TasksContext";

const TodoList = () => {
  const inputRef = useRef();
  const [posts, setPosts] = useState(null);
  const [allTasks, setAllTasks] = useState(null);
  const [error, setError] = useState(null);
  const [loading, isLoading] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);
  const { finishTasks } = useContext(TasksContext);

  async function fetchData() {
    try {
      isLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
      isLoading(false);
    } catch (error) {
      setError(error);
      isLoading(false);
    }
  }
  function addTask(task) {
    setPosts((prevPosts) => [
      ...prevPosts,
      { id: prevPosts.length + 1, title: task },
    ]);
  }
  function getAllTasks() {
    setShowCompleted(true);
    setPosts(allTasks);
  }

  function getCompletedTasks() {
    if (finishTasks && finishTasks.length > 0) {
      const completedTasks = posts.filter((post) =>
        finishTasks.includes(post.id)
      );
      setAllTasks(posts);
      setPosts(completedTasks);
      setShowCompleted(false);
    }
  }

  useEffect(() => {
    inputRef.current.focus();
    fetchData();
  }, []);

  return (
    <div
      className={`${style.todoList} container text-white p-4 my-5 rounded-3`}
    >
      <h2 className="text-center mb-4 mt-2">Todo App</h2>
      <div className="form-group mb-4 position-relative">
        <input
          ref={inputRef}
          type="text"
          id="newTask"
          name="newTask"
          className="form-control"
        ></input>
        <button
          onClick={() => addTask(inputRef.current.value)}
          className={`btn btn-success position-absolute top-0 end-0 ${style.addTaskBtn}`}
        >
          Add Task
        </button>
      </div>
      {finishTasks && finishTasks.length > 0 && showCompleted === true ? (
        <div className="text-center">
          <button className="btn btn-info mb-4" onClick={getCompletedTasks}>
            Get Completed Tasks
          </button>
        </div>
      ) : null}

      {posts && posts.length > 0 && showCompleted === false ? (
        <div className="text-center">
          <button className="btn btn-info mb-4" onClick={() => getAllTasks()}>
            Get All Tasks
          </button>
        </div>
      ) : null}
      {loading ? (
        <p className="alert alert-success">Loading...</p>
      ) : error ? (
        <p className="alert alert-danger">Error: {error.message}</p>
      ) : (
        posts &&
        posts.length > 0 &&
        posts.map((post) => (
          <TodoItem key={post.id} id={post.id} title={post.title} />
        ))
      )}
    </div>
  );
};

export default TodoList;
