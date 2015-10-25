var Grocery = React.createClass({
 rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
 render: function(){
  return(
   <li className="grocery">
    <h2 className="groceryName">
     {this.props.name + ": $" + this.props.price}
    </h2>
    <span dangerouslySetInnerHTML={this.rawMarkup()} />
   </li>
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
   <ul className="groceryList">
     {groceryNodes}
   </ul>
  );
 }
});

var GroceryForm = React.createClass({
 handleSubmit: function(e){
  e.preventDefault();
  var name = this.refs.name.value.trim();
  var comment = this.refs.comment.value.trim();
  var price = this.refs.price.value.trim();
  if (!name || !price){
   return;
  }
  this.props.onGrocerySubmit({name: name, price: price, comment: comment});
  this.refs.name.value = '';
  this.refs.comment.value = '';
  this.refs.price.value = '0.00';
  return;
 },
 render: function(){
  return(
   <form className="groceryForm" onSubmit={this.handleSubmit}>
    <input type="text" placeholder="Grocery item" ref="name"/>
    <input type="number" placeholder="0.00" min="0.01" step="0.01" ref="price"/>
    <input type="text" placeholder="additional comments about this item" ref="comment"/>
    <input type="submit" value="Add item" />
   </form>
  );
 }
});

var GroceryBox = React.createClass({
 getInitialState: function(){
  return {data: []};
 },
 handleGrocerySubmit: function(grocery) {
   var groceries = this.state.data;
   var newGroceries = groceries.concat([grocery]);
   this.setState({data: newGroceries});
    $.ajax({
     url: this.props.url,
     dataType: 'json',
     type: 'POST',
     data: grocery,
     success: function(data){
      this.setState({data: data});
     }.bind(this),
     error: function(xhr, status, err){
      console.error(this.props.url, status, err.toString());
     }.bind(this)
    });
  },
 loadGroceriesFromServer: function(){
  $.ajax({
   url: this.props.url,
   dataType: 'json',
   cache: false,
   success: function(data){
    this.setState({data: data});
   }.bind(this),
   error: function(xhr, status, err){
    console.error(this.props.url, status, err.toString());
   }.bind(this)
  });
 },
 componentDidMount: function(){
  this.loadGroceriesFromServer();
  setInterval(this.loadGroceriesFromServer, this.props.pollInterval);
 },
 render: function(){
  return(
   <div className="groceryBox">
    <h1>Groceries</h1>
    <GroceryList data={this.state.data} />
    <GroceryForm onGrocerySubmit={this.handleGrocerySubmit} />
   </div>
  );
 }
});

ReactDOM.render(
 <GroceryBox url="/api/grocerylist" pollInterval={2000} />,
 //<GroceryList data={data} />,
 document.getElementById('content')
);
