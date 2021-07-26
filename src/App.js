import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import About from "./components/About"
// import { router } from "json-server"

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])
  
      //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5005/tasks")
    const data = await res.json()

    return data
  }
    
      //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5005/tasks/${id}`)
    const data = await res.json()

    return data
  }
    
      //Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5005/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([ ...tasks, data ])

      //This method does not save added tasks to the database
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([ ...tasks, newTask])
  }

      //Delete Tasks
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5005/tasks/${id}`, {
      method: "DELETE",
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

      //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5005/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map(
        (task) =>
        task.id === id ? { ...task, reminder: data.reminder} : task
      )
    )
  }

  return (
    <Router>
      <div className="container">
        <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder}
                />
              ) : (
                <h3 style={{ color: "maroon" }}>No Tasks Remaining</h3>
              )}
              <h4 style={{ color:"rgb(50, 130, 50)" }}>Double click on a task to toggle the reminder</h4>
            </>
          )}
        />
        <Route
        path="/about"
        component={About}
        />
        <Footer />
      </div>
    </Router>
  )
}

export default App
