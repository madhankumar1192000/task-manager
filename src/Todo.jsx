import { useState } from "react"

export default function Todo() {
    const [title, setTitle] = useState("");
    const [description, setDesciption] = useState("");
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [editId, setEditId] = useState(-1);

    // Edit
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDesciption] = useState("");

    
    const handleSubmit = () => {
        setError("")
        //check inputs
        
                    setTodos([...todos, {title, description}])
                    setTitle("");
                    setDesciption("");
                    setMessage("Item added successfully")
                    setTimeout(() => {
                        setMessage("");
                    },3000)

                }

    const handleEdit = (item) => {
        setEditId(item._id); 
        setEditTitle(item.title); 
        setEditDesciption(item.description)
    }

    const handleUpdate = () => {
        setError("")
        //check inputs
                    const updatedTodos = todos.map((item) => {
                        if (item._id == editId) {
                            item.title = editTitle;
                            item.description = editDescription;
                        }
                        return item;
                    })

                    setTodos(updatedTodos)
                    setEditTitle("");
                    setEditDesciption("")
                    setMessage("Item updated successfully")
                    setTimeout(() => {
                        setMessage("");
                    },3000)

                    setEditId(-1)
    }

    const handleEditCancel = () => {
        setEditId(-1)
    }

    const handleDelete = (title) => {
               const updatedTodos = todos.filter((item) => item.title !== title)
               setTodos(updatedTodos)
    }

    return <>
        <div className="row p-3 bg-info text-light">
            <h1>Welcome to Task Management</h1>
        </div>
        <div className="row">
            <h3>Add Task</h3>
            {message && <p className="text-success">{message}</p>}
            <div className="form-group d-flex gap-2">
                <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" type="text" />
                <input placeholder="Description" onChange={(e) => setDesciption(e.target.value)} value={description} className="form-control" type="text" />
                <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
            </div>
           {error && <p className="text-danger">{error}</p>}
        </div>
        <div className="row mt-3">
            <h3>Your Tasks</h3>
            <div className="col-md-6">

                <ul className="list-group">
                    { 
                    todos.map((item) =>  <li className="list-group-item text-light bg-success d-flex justify-content-between align-items-center my-2">
                    <div className="d-flex flex-column me-2">
                        {
                            editId == -1 || editId !==  item._id ? <>
                                <span className="fw-bold">{item.title}</span>
                                <span>{item.description}</span>
                                <span>Created at: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </> : <>
                            <div className="form-group d-flex gap-2">
                                <input placeholder="Title" onChange={(e) => setEditTitle(e.target.value)} value={editTitle} className="form-control" type="text" />
                                <input placeholder="Description" onChange={(e) => setEditDesciption(e.target.value)} value={editDescription} className="form-control" type="text" />
                            </div>
                            </>
                        }
                    

                    </div>
                    <div className="d-flex gap-2">
                        { editId == -1 ?<button className="btn btn-warning" onClick={() => handleEdit(item)} >Edit</button>:<button className="btn btn-warning" onClick={handleUpdate} >Update</button>}
                        { editId == -1 ? <button className="btn btn-danger" onClick={() => handleDelete(item.title)}>Delete</button> :
                        <button className="btn btn-danger" onClick={handleEditCancel}>Cancel</button> }
                    </div>
                </li>
                
                )
                    }
                
                
                </ul>
            </div>
        </div>
    </>
    
}