import Board from "./components/Board"
import { TaskProvider } from "./context/TaskContext"

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-100 to-purple-100">
        <header className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-6 shadow-lg">

  {/* Glow effect */}
  <div className="absolute inset-0 bg-white/10 backdrop-blur-md"></div>

  <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6">
    
    {/* LEFT SIDE */}
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">
        Mini Jira Board
        
      </h1>
      <p className="text-sm text-white/80 mt-1">
        Manage your tasks efficiently 🚀
      </p>
    </div>
    </div>
</header>

        <main className="max-w-7xl mx-auto p-4">
          <Board />
        </main>
      </div>
    </TaskProvider>
  )
}

export default App