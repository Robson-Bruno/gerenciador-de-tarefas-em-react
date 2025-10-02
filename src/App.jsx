import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { Outlet } from "react-router-dom";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (tasks.length === 0) {
      const fetchTasks = async () => {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );
        const data = await response.json();
        // A API não retorna `isCompleted`, então adicionamos manualmente.
        const tasksWithCompletion = data.map((task) => ({
          ...task,
          isCompleted: task.completed,
        }));
        setTasks(tasksWithCompletion);
      };
      fetchTasks();
    }
  }, []); // O array vazio garante que isso rode apenas uma vez.

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      // PRECISO ATUALIZAR ESSA TAREFA
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      // NÃO PRECISO ATUALIZAR ESSA TAREFA
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Outlet
          context={{ tasks, onTaskClick, onDeleteTaskClick, onAddTaskSubmit }}
        />
      </div>
    </div>
  );
}

export default App;
