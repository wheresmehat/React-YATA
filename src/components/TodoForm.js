const React = require("react");

class TodoForm extends React.Component {

    constructor(props) {

        super(props);

        this.handleInputTextChangeEvt = this.handleInputTextChangeEvt.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleRefInputEvt = this.handleRefInputEvt.bind(this);
    }

    handleInputTextChangeEvt(evt) {

        const todoText = evt.target.value;

        this.props.onTodoSearch(todoText);
    }

    handleFormSubmit(evt) {

        evt.preventDefault();
        
        this.props.onNewTodoItem();
    }

    handleRefInputEvt (inputRef) {

        inputRef.focus();
    }

    render() {

        return (
            <form className="form-group" onSubmit={this.handleFormSubmit}>
                <input 
                    className="form-control" 
                    type="text" 
                    placeholder="Type to search or press enter to add todo"
                    onChange={this.handleInputTextChangeEvt} 
                    ref={this.handleRefInputEvt}
                    value={this.props.todoText} 
                />
            </form>
        );

    }

}


module.exports = TodoForm;