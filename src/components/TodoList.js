var React = require("react");

var TodoItem = require("./TodoItem");

var TodoList = function(props) {

    return (
        <ul className="list-group">
            {props.todos.map((todoObj, index) => {
                return (
                    <TodoItem
                        todoItem={todoObj}
                        key={todoObj.id}  // this is good, it would be bad to define the key here; define the keys in the parent components, not in child components
                        onCheckboxClick={props.onCheckboxClick}
                        onDeleteBtnClick={props.onDeleteBtnClick}
                    />
                )
            })}
        </ul>
    );

};


module.exports = TodoList;