var React = require("react");

var TodoForm = require("./TodoForm");
var TodoList = require("./TodoList");
var TodosCount = require("./TodosCount");
var FilterLinks = require("./FilterLinks");
var constants = require("../constants");

var { ALL, ACTIVE, COMPLETED } = constants;

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

            var todoItem = {
                 
                todo: prevState.searchTerm, 
                completed: false, 
                id: Date.now().toString()   // this is good; define the keys in the parent components, not in child components
            }  

            var todos = prevState.todos.concat(todoItem);

            return { todos, searchTerm: "" };
        });

    }

    handleCheckboxClick(evt) {

        var id = evt.target.value;

        this.setState((prevState) => {

            var todos = prevState.todos;

            var index = todos.findIndex((el) => {
    
                return el.id === id;
            });

            todos = ( 

                todos.slice(0, index)
                    .concat({
                        todo: todos[index].todo,
                        completed: !todos[index].completed,
                        id: todos[index].id
                    })
                    .concat(todos.slice(index + 1))
            );

            return { todos };
        });

    }

    handleDeleteBtnClick(evt) {

        var id = evt.target.value;

        this.setState((prevState) => {

            var todos = prevState.todos;

            todos = todos.filter((todo) => {
    
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

        var todos = this.state.todos;
        var currentFilter = this.state.currentFilter;
        var searchTerm = this.state.searchTerm;
        var searchReg = new RegExp(searchTerm, "i");

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

        var todos = this.filterTodos();

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