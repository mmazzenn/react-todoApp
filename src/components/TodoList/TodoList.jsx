import React, { useState, useEffect, useRef } from "react";
import TodoItem from "../TodoItem/TodoItem";
import style from "./TodoList.module.css";
import axios from "axios";

const TodoList = () => {
  const inputRef = useRef();
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, isLoading] = useState(false);

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
