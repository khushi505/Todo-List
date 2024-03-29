import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "./App.css";

function App() {
  const [todo, setTodo] = useState(""); //input of todo
  const [todos, setTodos] = useState([]); //array of todos
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveTols = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i, id === id);
    setTodo(t[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);
    saveTols();
  };

  const handleDelete = (e, id) => {
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    console.log(index);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);
    saveTols();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
    saveTols();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    console.log(e, e.target);
    let id = e.target.name;
    console.log(`The id is ${id}`);
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    console.log(index);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    console.log(newTodos, todos);
    saveTols();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 my-10 rounded-xl p-5 bg-black drop-shadow-2xl bg-opacity-30 min-h-[80vh] w-1/2 ">
        <h1 className="font-bold text-center text-xl ">
          iTask - काम करके सपने साकार करो।
        </h1>
        <h1 className="text-lg font-bold my-4 mx-1">Add to Todo </h1>
        <div className="addTodo my-5 flex flex-center gap-5 ">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-lg px-5 py-1"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-black hover:bg-black disabled:black w-20  p-2 py-1  font-bold text-white rounded-md cursor-pointer text-md"
          >
            Save
          </button>
        </div>
        <input
          type="checkbox"
          checked={showFinished}
          onChange={toggleFinished}
        />{" "}
        Show Finished Tasks
        <h1 className="text-lg font-bold my-4 mx-1">Let's Finish </h1>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Task to do</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex w-1/2 justify-between ">
                  <div className="flex gap-5">
                    <input
                      type="checkbox"
                      name={item.id}
                      onChange={handleCheckbox}
                      id=""
                      checked={item.isCompleted}
                    />
                    <div
                      className={`${
                        item.isCompleted ? "line-through" : ""
                      } my-3`}
                    >
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons display-flex h-full my-3">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-black hover:bg-black p-2 py-1 text-sm font-bold text-white rounded-md mx-6"
                    >
                      <MdEditSquare />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-black hover:bg-black p-2 py-1 text-sm font-bold text-white rounded-md mx-6"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
