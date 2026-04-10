import { useState } from "react"
import { useTask } from "../context/TaskContext"
import Column from "./Column"
import TaskCard from "./TaskCard"

import { motion } from "framer-motion"
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"

const Board = () => {
  const { tasks, setTasks, users, createTask } = useTask()

  const [activeTask, setActiveTask] = useState(null)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [assigneeId, setAssigneeId] = useState("")
  const [status, setStatus] = useState("not_started")
  const [priority, setPriority] = useState("medium")

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    createTask({
      title,
      description,
      deadline,
      assigneeId,
      status,
      priority
    })

    setTitle("")
    setDescription("")
    setDeadline("")
    setAssigneeId("")
    setStatus("not_started")
    setPriority("medium")
  }

  const handleDragStart = (event) => {
    const task = tasks.find(t => t.id === event.active.id)
    setActiveTask(task)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) return

    const activeTask = tasks.find(t => t.id === active.id)

    if (["not_started", "in_progress", "completed"].includes(over.id)) {
      setTasks(prev =>
        prev.map(t =>
          t.id === active.id ? { ...t, status: over.id } : t
        )
      )
    } else {
      const overTask = tasks.find(t => t.id === over.id)
      if (!overTask) return

      if (activeTask.status === overTask.status) {
        const columnTasks = tasks.filter(t => t.status === activeTask.status)

        const oldIndex = columnTasks.findIndex(t => t.id === active.id)
        const newIndex = columnTasks.findIndex(t => t.id === over.id)

        const reordered = arrayMove(columnTasks, oldIndex, newIndex)

        const newTasks = tasks.map(t => {
          if (t.status !== activeTask.status) return t
          return reordered.shift()
        })

        setTasks(newTasks)
      } else {
        setTasks(prev =>
          prev.map(t =>
            t.id === active.id ? { ...t, status: overTask.status } : t
          )
        )
      }
    }

    setActiveTask(null)
  }

  const filter = (status) => tasks.filter(t => t.status === status)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-7xl p-6"
    >
      
      {/* 🔥 FORM */}
      <form
        onSubmit={handleAddTask}
        className="mb-6 grid grid-cols-1 md:grid-cols-7 gap-3 
        bg-white/70 backdrop-blur-xl p-5 rounded-2xl shadow-xl border border-white/40"
      >
        <input value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="p-3 rounded-lg border border-gray-200 bg-white/80 focus:ring-2 focus:ring-indigo-400 outline-none"
        />

        <input value={description} onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="p-3 rounded-lg border border-gray-200 bg-white/80 focus:ring-2 focus:ring-indigo-400"
        />

        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)}
          className="p-3 rounded-lg border border-gray-200"
        />

        <select value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)}
          className="p-3 rounded-lg border border-gray-200">
          <option value="">User</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}
          className="p-3 rounded-lg border border-gray-200">
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select value={priority} onChange={(e) => setPriority(e.target.value)}
          className="p-3 rounded-lg border border-gray-200">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition">
          Add
        </button>
      </form>

      <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Column title="Not Started" tasks={filter("not_started")} status="not_started" />
          <Column title="In Progress" tasks={filter("in_progress")} status="in_progress" />
          <Column title="Completed" tasks={filter("completed")} status="completed" />
        </div>

        <DragOverlay>
          {activeTask && (
            <div className="w-[300px] scale-105 shadow-2xl">
              <TaskCard task={activeTask} isOverlay />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </motion.div>
  )
}

export default Board