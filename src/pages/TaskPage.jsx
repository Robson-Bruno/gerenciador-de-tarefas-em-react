import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

function TaskPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  return (
    <div className="w-full max-w-[500px] mx-auto p-4">
      <div className="flex justify-center relative mb-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-0 bottom-0 text-slate-100"
        >
          <ChevronLeftIcon />
        </button>
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Detalhes da Tarefa
        </h1>
      </div>
      <div className="bg-slate-200 rounded-md p-6 space-y-2">
        <h2 className="text-xl font-bold text-slate-700">{title}</h2>
        <p className="text-slate-600">{description}</p>
      </div>
    </div>
  );
}

export default TaskPage;
