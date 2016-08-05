var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var Q = require('q');
var apiEndpoint = "/v3/contactdb/recipients";

module.exports = function(recipient_id,list_id){
    var defer = Q.defer();

    var request = sg.emptyRequest()
    request.method = 'POST'
    request.path = '/v3/contactdb/lists/'+list_id+'/recipients/'+recipient_id
    sg.API(request, function (error, response) {
        error = error || {};
        response = response || {};

        if(error.error_count !==  undefined && error.error_count>0){
            console.log('add user to list had one or several errors');
        }

        var message = 'add user '+recipient_id+' to list '+list_id;
        if(response.statusCode && response.statusCode !== 201){
            console.log(message+' FAILED');
            defer.reject(response);
        }

        console.log(message+' OK');
        defer.resolve(response);
    })

    return defer.promise;
}