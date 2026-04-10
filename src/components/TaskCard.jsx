import { useState } from "react"
import { useTask } from "../context/TaskContext"
import { motion } from "framer-motion"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

// 🔥 Helpers
const getPriorityColor = (priority) => {
  if (priority === "high") return "bg-rose-100 text-rose-600"
  if (priority === "medium") return "bg-amber-100 text-amber-700"
  return "bg-emerald-100 text-emerald-600"
}

const getStatusColor = (status) => {
  if (status === "completed") return "bg-emerald-100 text-emerald-600"
  if (status === "in_progress") return "bg-indigo-100 text-indigo-600"
  return "bg-slate-200 text-slate-700"
}

const TaskCard = ({ task, isOverlay = false }) => {
  const { users, updateTask, deleteTask } = useTask()

  const [isEdit, setIsEdit] = useState(false)

  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description
  })

  const sortable = useSortable({ id: task.id })

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = isOverlay ? {} : sortable

  const style = isOverlay
    ? {}
    : {
        transform: isDragging
          ? undefined
          : CSS.Transform.toString(transform),
        transition
      }

  const assignee = users.find(u => u.id === task.assigneeId)

  const isOverdue =
    task.deadline && new Date(task.deadline) < new Date()

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div
        ref={setNodeRef}
        style={style}
        className={`bg-white/70 backdrop-blur-xl p-4 rounded-xl shadow-md border-l-4 ${
          task.priority === "high"
            ? "border-rose-400"
            : task.priority === "medium"
            ? "border-amber-400"
            : "border-emerald-400"
        } border-gray-200 ${
          isDragging ? "opacity-0" : ""
        }`}
      >
        {/* 🔥 DRAG HANDLE  */}
        {!isOverlay && (
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab text-gray-400 mb-2"
          >
            ⋮⋮
          </div>
        )}

        {/* 🔹 Status + Priority */}
        <div className="flex justify-between items-center mb-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
            {task.status.replace("_", " ")}
          </span>

          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
            {task.priority || "medium"}
          </span>
        </div>

        {/* 🔹 EDIT MODE */}
        {isEdit ? (
          <div className="space-y-2">
            <input
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              className="w-full border p-2 text-sm rounded"
            />

            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  description: e.target.value
                })
              }
              className="w-full border p-2 text-sm rounded"
            />

            <div className="flex gap-2">
              <button
                onClick={() => {
                  updateTask({ ...task, ...editData })
                  setIsEdit(false)
                }}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs py-1 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setIsEdit(false)}
                className="flex-1 bg-gray-400 text-white text-xs py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* 🔹 Title */}
            <h3 className="font-semibold text-gray-800">
              {task.title}
            </h3>

            {/* 🔹 Description */}
            <p className="text-sm text-gray-500 mt-1">
              {task.description}
            </p>
          </>
        )}

        {/* 🔹 Deadline */}
        <div
          className={`text-xs mt-2 ${
            isOverdue ? "text-red-500 font-semibold" : "text-gray-600"
          }`}
        >
          📅 {task.deadline || "No date"}
          {isOverdue && " ⚠️ Overdue"}
        </div>

        {/* 🔹 Avatar */}
        <div className="flex items-center gap-2 mt-2">
          <div className="w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-semibold">
            {assignee?.name?.charAt(0) || "U"}
          </div>

          <span className="text-xs text-gray-600">
            {assignee?.name || "Unassigned"}
          </span>
        </div>

        {/* 🔥 BUTTONS  */}
        {!isOverlay && (
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setIsEdit(true)}
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-xs py-1 rounded transition"
            >
              Edit
            </button>

            <button
              onClick={() => deleteTask(task.id)}
              className="flex-1 bg-rose-500 hover:bg-rose-600 text-white text-xs py-1 rounded transition"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default TaskCard