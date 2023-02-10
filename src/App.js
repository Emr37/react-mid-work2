import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  const [showItems, setShowItems] = useState([])
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [completedItems, setCompletedItems] = useState([]);
  const [activeItems, setActiveItems] = useState([]);
  const [showCondition, setShowCondition] = useState('All');

  const submitTodo = (e) => {
    e.preventDefault();

    if (todo === '') { return false }

    setTodos([...todos,
    {
      id: todos.length,
      todo: todo,
      completed: false
    }
    ]);

    setTodo('');
  }

  const deleteTodo = (item) => {
    let temp = [...todos];
    temp.splice(item.id, 1);

    for (let i = 0; i < temp.length; i++){
        temp[i].id = i;
    }    
    setTodos(temp); 
  }

  const complete = (item) => {    
    item.completed = !item.completed;
    setTodos([...todos])
  }

  const clearCompleted = () => {

    let temp = todos.filter(item => !item.completed)    
    for (let i = 0; i < temp.length; i++){
      temp[i].id = i;
    }  
    setTodos(temp);
    setCompletedItems([]);
  }

  const selectAll = () => {
    setActiveItems([]);
    setCompletedItems([]);
    setShowCondition('All');
  }

  const selectActive = () => {
    setCompletedItems([]);
    let temp = todos.filter(item => !item.completed)
    setActiveItems(temp);
    setShowCondition('Active');
  }

  const selectCompleted = () => {
    setActiveItems([]);
    let temp = todos.filter(item => item.completed)
    setCompletedItems(temp);
    setShowCondition('Completed');
  }

  useEffect(() => {  
    setActiveItems(todos)
    }, [todos])

  useEffect(() => {
    if (showCondition === 'All') {
      setShowItems(todos)
    }
    if (showCondition === 'Completed') {
      setShowItems(completedItems)
    }
    if (showCondition === 'Active') {
      setShowItems(activeItems)
    }
  }, [showCondition, todos, activeItems, completedItems])


  const listTodos = showItems?.map((item) => {    
    return (
      <li key={item.id} className={[item.completed && "completed"]} >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={item.completed ? true : false}
            onChange={() => complete(item)}
          />
          <label>{item.todo}</label>
          <button
            className="destroy"
            onClick={() => deleteTodo(item)}
          ></button>
        </div>
      </li>

    )
  });

  const count = showItems.length;
  const item = count === 1 ? 'item' : 'items';  

  return (
    <div className="App">
      <div className="todoapp">
        <div className="header">
          <h1>todos</h1>
          <form onSubmit={submitTodo}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              onChange={(e) => setTodo(e.target.value)}
              value={todo}

            />
          </form>
        </div>

        <div className="main">
          <input className="toggle-all" type="checkbox" defaultChecked={false} style={{ color: 'green' }} />
          <label htmlFor='toggle-all'>
            Mark all as complete
          </label>

          <ul className="todo-list">
            {listTodos}
          </ul>
        </div>

        <div className="footer">
          <span className="todo-count">
            <strong>{count} </strong>
            {item} {[showCondition === 'Completed' ? 'completed' : 'left']}

          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={[showCondition === 'All' && 'selected']}
                onClick={selectAll}
              >All</a>
            </li>
            <li>
              <a
                href="#/"
                className={[showCondition === 'Active' && 'selected']}
                onClick={selectActive}
              >Active</a>
            </li>
            <li>
              <a
                href="#/"
                className={[showCondition === 'Completed' && 'selected']}
                onClick={selectCompleted}

              >Completed</a>
            </li>
          </ul>

          <button
            className="clear-completed"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        </div>
      </div>

      <div className="info">
        <p>Created by <a href="https://www.linkedin.com/in/emrah-aksoy/">Emrah Aksoy</a></p>
      </div>
    </div>
  );
}

export default App;
