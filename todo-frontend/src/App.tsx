import * as React from 'react';
import { Todo, DefaultApi } from './api';
import './App.css';
import { Configuration } from './api';

const todoApi = new DefaultApi(new Configuration({basePath: 'http://localhost:8099'}));

class App extends React.Component<{}, { todos: Array<Todo> }> {
  private titleInput: HTMLInputElement;

  constructor() {
    super([]);

    this.state = {
      todos: [],
    };
  }

  async componentDidMount() {
    const todos = (await todoApi.listTodos({})).data;
    this.setState({ todos });
  }

  async addTodo(title: string) {
    const todo: Todo = {
      id: '',
      title,
      resolved: false,
    };

    const todos = (await todoApi.addTodo(todo )).data;
    this.setState({ todos });
  }

  async removeToDo(id: string) {
    const todos = (await todoApi.removeTodo(id)).data;
    this.setState({ todos });
  }

  async doneToDo(id: string) {
    const todos = (await todoApi.resolveTodo(id)).data;
    this.setState({ todos });
  }

  render() {
    return (
      <div className="App">
        <h1>Todo List</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.addTodo(this.titleInput.value);
            this.titleInput.value = '';
          }}
        >
          <input
            ref={node => {
              if (node !== null) {
                this.titleInput = node;
              }
            }}
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {this.state.todos.map((todo, index) => {
            return (
              <li
                className="qa-main"
                key={index}
                style={{
                  textDecoration: todo.resolved ? 'line-through' : 'none',
                }}
              >
                {!todo.resolved && (
                  <button onClick={() => this.doneToDo(todo.id || '')} className="qa-done-button">Done</button>
                )}
                <button onClick={() => this.removeToDo(todo.id || '')} className="qa-delete-button">
                  Delete
                </button>{' '}
                {todo.title}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
