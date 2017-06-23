const React = require("react");

const TodoForm = require("./TodoForm");
const TodoList = require("./TodoList");
const TodosCount = require("./TodosCount");
const FilterLinks = require("./FilterLinks");
const { ALL, ACTIVE, COMPLETED } = require("../constants");


class Todo extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            searchTerm: "",
            currentFilter: ALL,
            todos: []
        };

        this.handleNewTodoItem = this.handleNewTodoItem.bind(this);
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
        this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleTodoSearch = this.handleTodoSearch.bind(this);
    }

    handleNewTodoItem() {

        this.setState((prevState) => {

            const todoItem = {

                todo: prevState.searchTerm,
                completed: false,
                id: Date.now().toString()   // this is good; define the keys in the parent components, not in child components
            }

            const todos = prevState.todos.concat(todoItem);

            return { todos, searchTerm: "" };
        });

    }

    handleCheckboxClick(evt) {

        const id = evt.target.value;

        this.setState((prevState) => {

            let todos = prevState.todos;

            const index = todos.findIndex((todo) => {

                return todo.id === id;
            });

            const { todo, completed } = todos[index];

            todos = (

                todos.slice(0, index)
                    .concat({
                        todo: todo,
                        completed: !completed,
                        id: id
                    })
                    .concat(todos.slice(index + 1))
            );

            return { todos };
        });

    }

    handleDeleteBtnClick(evt) {

        const id = evt.target.value;

        this.setState((prevState) => {

            const todos = prevState.todos.filter((todo) => {

                return todo.id !== id;
            });

            return { todos };
        });

    }

    handleFilterChange(evt, currentFilter) {

        evt.preventDefault();

        this.setState(() => {

            return { currentFilter }
        });

    }

    filterTodos() {

        const { todos, currentFilter, searchTerm } = this.state;
        
        const searchReg = new RegExp(searchTerm, "i");

        if (currentFilter === ACTIVE) {

            return todos.filter((todo) => {

                return todo.completed === false && todo.todo.search(searchReg) !== -1;
            });
        }
        else if (currentFilter === COMPLETED) {

            return todos.filter((todo) => {

                return todo.completed === true && todo.todo.search(searchReg) !== -1;
            });
        }
        else {

            return todos.filter((todo) => {

                return todo.todo.search(searchReg) !== -1;
            });
        }

    }

    handleTodoSearch(searchTerm) {

        this.setState(() => {

            return { searchTerm };
        });

    }

    render() {

        const todos = this.filterTodos();

        return (
            <div>
                <TodoForm
                    todoText={this.state.searchTerm}
                    onNewTodoItem={this.handleNewTodoItem}
                    onTodoSearch={this.handleTodoSearch}
                />
                <FilterLinks
                    currentFilter={this.state.currentFilter}
                    onFilterChange={this.handleFilterChange}
                />
                <TodoList
                    todos={todos}
                    onCheckboxClick={this.handleCheckboxClick}
                    onDeleteBtnClick={this.handleDeleteBtnClick}
                />
                <TodosCount todosCount={todos.length} />
            </div>

        );

    }

}


module.exports = Todo;