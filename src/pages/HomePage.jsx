import { useOutletContext } from "react-router-dom";
import AddTask from "../components/AddTask";
import Tasks from "../components/Tasks";
import Title from "../components/Title";

function HomePage() {
  const { tasks, onTaskClick, onDeleteTaskClick, onAddTaskSubmit } =
    useOutletContext();
  return (
    <>
      <Title>Gerenciador de Tarefas</Title>
      <AddTask onAddTaskSubmit={onAddTaskSubmit} />
      <Tasks
        tasks={tasks}
        onTaskClick={onTaskClick}
        onDeleteTaskClick={onDeleteTaskClick}
      />
    </>
  );
}

export default HomePage;
