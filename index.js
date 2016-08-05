var express = require('express');
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars');


var subscribeUser = require('./subscribeUser');
var addUserToList = require('./addUserToList');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.post('/test', function(request, response){
    console.log('request query', request.query);
    console.log('request params', request.params);
    console.log('request body', request.body);
    response.send(request.body);
});

app.get('/', function(request, response){
    response.render('subscribe');
});

app.post('/subscribe', function(request, response){
    var body = request.body;

    subscribeUser(body)
    .then(function(res){
        
        // case 403 means misconfiguration
        // maybe lack of process.env.SENDGRID_API_KEY
        if(res.statusCode == 403){
            response.send(res);
        }

        // add the first persisted recipient from the response
        //{"persisted_recipients"}

        if(body.list_id && res.body){

            //in some ocassions it comes unparsed
            var sendgrid_response_body = res.body;
            if(typeof res.body === 'string'){
                sendgrid_response_body = JSON.parse(res.body);
            }

            if(sendgrid_response_body.persisted_recipients && 
                sendgrid_response_body.persisted_recipients instanceof Array &&
                sendgrid_response_body.persisted_recipients.length){
                    
                    addUserToList(sendgrid_response_body.persisted_recipients[0], body.list_id)
                    .then(function(res){

                    })
                    .catch(function(e){

                    })
            }
        }

        response.send(res);
    })
    .catch(function(e){
        response.send(e);
    })

});



var port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log('sendgrid-subscribe-user server running on port '+port);
})