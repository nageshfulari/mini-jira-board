export const mockUsers = [
  { id: "u1", name: "Anu" },
  { id: "u2", name: "Rahul" },
  { id: "u3", name: "Meena" },
]

export const initialTasks = [
  {
    id: "task-1",
    title: "Design login page",
    description: "Make a simple UI for login",
    status: "not_started",
    assigneeId: "u1",
    deadline: "2026-04-14",
  },
  {
    id: "task-2",
    title: "Create navbar",
    description: "Add links and basic styles",
    status: "in_progress",
    assigneeId: "u2",
    deadline: "2026-04-16",
  },
  {
    id: "task-3",
    title: "Test board drag",
    description: "Check drag and drop in all columns",
    status: "completed",
    assigneeId: "u3",
    deadline: "2026-04-12",
  },
]
