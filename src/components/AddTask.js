import { useState } from "react"

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState("")
    const [notes, setNotes] = useState("")
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!text) {
            alert("Please add a task")
            return
        }

        onAdd({ text, notes, reminder })

        setText("")
        setNotes("")
        setReminder(false)
    }

    return (
        <form
        className= "add-form"
        onSubmit= {onSubmit}
        >
            <div className="form-control">
                <label>Task</label>
                <input
                type= "text"
                placeholder= "Add a Task"
                value= {text}
                onChange= { (e) => setText(e.target.value) }
                />
            </div>
            
            <div className="form-control">
                <label>Notes</label>
                <input
                type= "text"
                placeholder= "Add any notes"
                value= {notes}
                onChange= { (e) => setNotes(e.target.value) }
                />
            </div>

            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input
                type= "checkbox"
                checked= {reminder}
                value= {reminder}
                onChange= { (e) => setReminder(e.currentTarget.checked) }
                />
            </div>

            <input type="submit" value="Save Task" className="btn btn-block" />
        </form>
    )
}

export default AddTask
