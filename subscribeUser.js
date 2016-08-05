var sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);
var Q = require('q');
var apiEndpoint = "/v3/contactdb/recipients";


/**
 * reference: https://github.com/sendgrid/sendgrid-nodejs/blob/master/examples/contactdb/contactdb.js#L16
 * @param user Object
 */
module.exports = function(params, options){
    options = options || {};
    params = params || {};

    var defer = Q.defer();

    var request = sendgrid.emptyRequest()
    request.body = [
    {
        "email": params.email, 
        "first_name": params.first_name, 
        "last_name": params.last_name
    }
    ];
    request.method = 'POST'
    request.path = '/v3/contactdb/recipients'
    sendgrid.API(request, function (error, response) {
        error = error || {};
        response = response || {};

        if(error.error_count !==  undefined && error.error_count>0){
            console.log('create contact had one or several errors');
        }

        if(response.statusCode && response.statusCode !== 201){
            defer.reject(response);
        }

        defer.resolve(response);
    })

    return defer.promise;
}