import "./App.css";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
const { v4: uuidv4 } = require("uuid");

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoStirng = localStorage.getItem("tasks");
    if (todoStirng) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      setTasks(tasks);
    }
  }, []);

  const saveTasks = (params) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = tasks.filter(i =>i.id === id);

    setTask(t[0].task);

    let newTasks = tasks.filter((item) => {
      return item.id !== id;
    });
    setTasks(newTasks);
    saveTasks();
  };
  const handleDelete = (e, id) => {
    console.log(id);

    let newTasks = tasks.filter((item) => {
      return item.id !== id;
    });
    setTasks(newTasks);
    saveTasks();
  };
  const handleAdd = () => {
    setTasks([...tasks, { id: uuidv4(), task, isCompleted: false }]);
    setTask("");
    saveTasks();
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    console.log(id);
    let index = tasks.findIndex((item) => {
      return item.id === id;
    });
    let newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
    saveTasks();
  };

  return ( 
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-400 min-h-[80vh] md:w-[35%]">
        <div className="addTask my-5 flex flex-col gap-4">
          <h1 className="text-xl font-bold">Add Task</h1>
          <div className="flex">
            <input
              type="text"
              name=""
              id=""
              onChange={handleChange}
              value={task}
              className="rounded-xl w-full px-5 py-1 "
            />
            <button
              className="bg-white  rounded-md hover:bg-violet-500 m-2 px-2"
              onClick={handleAdd}
              disabled={task.length <= 3}
            >
              Add
            </button>
          </div>
        </div>
        <input type="checkbox" checked={showFinished} className="my-4" id="show" onChange={toggleFinished} />
        <label className="mx-2" htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className="text-lg font-bold my-4">Your Tasks in hand</h2>
        <div className="todos ">
          {tasks.length === 0 && <div className="m-5">No Task in hand</div>}
          {tasks.map((item) => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className={"task flex my-3 justify-between"}>
            <div className='flex gap-5'> 
            <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.task}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Edit</button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Delete</button>
            </div> 
          </div>
          })}
         </div>
        
       </div>
    </>
  )
}

export default App
