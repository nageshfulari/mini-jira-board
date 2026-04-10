import { createContext, useContext, useState, useEffect } from "react"
import { initialTasks, mockUsers } from "../data/dummyData"

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks")
    return saved ? JSON.parse(saved) : initialTasks
  })

  const [users] = useState(mockUsers)

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const createTask = (newTask) => {
    const taskToAdd = {
      ...newTask,
      id: "task-" + Date.now(),
    }
    setTasks((prev) => [...prev, taskToAdd])
  }

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    )
  }

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        users,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTask = () => useContext(TaskContext)