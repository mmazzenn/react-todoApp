import React, { createContext, useState } from "react";

export let TasksContext = createContext();

export default function TasksContextProvider(props) {
  const [finishTasks, setFinishTasks] = useState([]);
  return (
    <TasksContext.Provider value={{ finishTasks, setFinishTasks }}>
      {props.children}
    </TasksContext.Provider>
  );
}
