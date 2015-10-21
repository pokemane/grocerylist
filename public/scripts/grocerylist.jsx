var Grocery = React.createClass({
	render: function(){
		return(
			React.createElement('div', {className: "grocery"},
				"hello, I am another grocery item.")
		);
	}
});

ReactDOM.render(
	React.createElement(Grocery, null),
	document.getElementById('content')
);
