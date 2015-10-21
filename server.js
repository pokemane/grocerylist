var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var GROCERYLIST_FILE = path.join(__dirname, 'grocerylist.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/grocerylist', function(req, res){
	fs.readFile(GROCERYLIST_FILE, function(err, data){
		res.setHeader('Cache-Control', 'no-cache');
		res.json(JSON.parse(data));
	});
});

app.post('/api/grocerylist', function(req, res){
	fs.readFile(GROCERYLIST_FILE, function(err, data){
		var grocerylist = JSON.parse(data);
		grocerylist.push(req.body);
		fs.writeFile(GROCERYLIST_FILE, JSON.stringify(grocerylist, null, 4), function(err){
			res.setHeader('Cache-Control', 'no-cache');
			res.json(grocerylist);
		});
	});
});

app.listen(app.get('port'), function(){
	console.log('Server started: localhost:' + app.get('port') + '/');
});
