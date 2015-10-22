var Grocery = React.createClass({
	rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
	render: function(){
		return(
			<div className="grocery">
				<h2 className="groceryName">
					{this.props.name + ": $" + this.props.price}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}
});

var GroceryList = React.createClass({
	render: function(){
		var groceryNodes = this.props.data.map(function(grocery){
			return(
				<Grocery name={grocery.name} price={grocery.price}>
					{grocery.comment}
				</Grocery>
			);
		});
		return(
			<div className="groceryList">
			  {groceryNodes}
			</div>
		);
	}
});

var GroceryForm = React.createClass({
	render: function(){
		return(
			{}
		);
	}
});

var GroceryBox = React.createClass({
	render: function(){
		return(
			<div className="commentBox">
				<h1>Groceries</h1>
				<GroceryList data={this.props.data}/>
				<GroceryForm />
			</div>
		);
	}
});

var data = [
	{name: "soup", price: "0.99", comment: "I like soup"},
	{name: "nutella", price: "9.99", comment: "I like nutella!!!"},
	{name: "carrots", price: "3", comment: "carrots tho"},
];

ReactDOM.render(
	<GroceryList data={data}/>,
	document.getElementById('content')
);
