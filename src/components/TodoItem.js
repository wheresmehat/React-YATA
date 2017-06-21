var React = require("react");

/*
var TodoItem = function(props) {

    return (
        <li className="list-group-item">
            <h3>
                {props.todo}
                <button 
                    className="btn btn-default btn-danger pull-right"
                    onClick={props.onDeleteBtnClick}
                    value={props.index}    
                >
                    Delete
                </button>
            </h3>
        </li>
    );

};
*/


class TodoItem extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            priority: 0
        };


        this.handlePriorityBtnClick = this.handlePriorityBtnClick.bind(this);
    }

    handlePriorityBtnClick() {

        this.setState((prevState) => {

            return { priority: ++prevState.priority };
        });

    }

    render() {

        var todoItem = this.props.todoItem;

        return (
            <li className="list-group-item">
                <h3>
                    <input 
                        type="checkbox" 
                        className="pull-left"
                        checked={todoItem.completed}
                        onChange={this.props.onCheckboxClick}
                        value={todoItem.id} 
                    />
                    <button 
                        onClick={this.handlePriorityBtnClick}    
                    >
                        {this.state.priority}
                    </button>
                    &nbsp;&nbsp;{todoItem.todo}
                    <button 
                        className="btn btn-default btn-danger pull-right"
                        onClick={this.props.onDeleteBtnClick}
                        value={todoItem.id}    
                    >
                        Delete
                    </button>
                </h3>
            </li>

        );

    }

}

module.exports = TodoItem;