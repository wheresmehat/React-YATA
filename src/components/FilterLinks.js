var React = require("react");

var constants = require("../constants");

var { ALL, ACTIVE, COMPLETED } = constants;

var Link = function(props) {

    var currentFilter = props.currentFilter;
    var filterName = props.filterName;

    var linkStyle = {

        marginLeft: "3px", 
        marginRight: "3px"
    };

    if (currentFilter === filterName) {

        linkStyle.backgroundColor = "#e6e6e6";
        linkStyle.borderColor = "#adadad";
        linkStyle.lineHeight = "1.5";
    }

    return (

        <a 
            href="#" 
            className="btn btn-default btn-sm"
            style={ linkStyle }
            onClick={(evt) => {

                props.onFilterChange(evt, filterName);
            }}
        >
            <strong>{props.children}</strong>
        </a>

    );

}

var FilterLinks = function(props) {

    return (
        <div style={{marginBottom: "30px"}}>
            {"Display: "}
            <Link 
                filterName={ALL} 
                currentFilter={props.currentFilter} 
                onFilterChange={props.onFilterChange} 
            >
                {ALL}
            </Link>       
            <Link 
                filterName={ACTIVE} 
                currentFilter={props.currentFilter} 
                onFilterChange={props.onFilterChange} 
            >
                {ACTIVE}
            </Link>
            <Link
                filterName={COMPLETED}
                currentFilter={props.currentFilter}  
                onFilterChange={props.onFilterChange} 
            >
                {COMPLETED}
            </Link>
        </div>
    );

};


module.exports = FilterLinks;