import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { motion } from "framer-motion"
import TaskCard from "./TaskCard"

const Column = ({ title, tasks, status }) => {
  const { setNodeRef, isOver } = useDroppable({ id: status })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/60 backdrop-blur-xl p-4 rounded-2xl shadow-lg border border-white/40 hover:shadow-xl transition"
    >
      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-3">
        <h2
          className={`font-semibold text-sm tracking-wide
            ${status === "not_started" && "text-slate-600"}
            ${status === "in_progress" && "text-indigo-600"}
            ${status === "completed" && "text-emerald-600"}
          `}
        >
          {title}
        </h2>

        <span className="bg-slate-200 text-xs px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* 🔹 Droppable + Sortable */}
      <SortableContext
        items={tasks.map(t => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className={`flex flex-col gap-3 min-h-[140px] p-2 rounded-xl transition-all duration-200
            ${
              isOver
                ? "bg-indigo-100 border-2 border-indigo-300 scale-[1.02]"
                : "bg-transparent"
            }
          `}
        >
          {/* 🔹 Empty State */}
          {tasks.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-4 italic">
              Drop tasks here
            </p>
          )}

          {/* 🔹 Task List */}
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </motion.div>
  )
}

export default Column