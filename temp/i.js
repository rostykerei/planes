var mysql      = require('mysql');
//var types = require('./types.json');

let types = {};

for (var t of require('./types.json')) {
    types[t.Designator] = {
        type: t.Designator,
        manufacturer: t.ManufacturerCode,
        model: t.ModelFullName,
        classification: t.Description,
        status: 'N',
        last_updated: '2017-11-22 12:00:00'
    };


}

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'planes'
});

connection.query('SELECT type FROM aircraft_type', function (error, results, fields) {

    for (var r of results) {

        var query = connection.query('UPDATE aircraft_type SET ? WHERE type = "' + r.type + '"', types[r.type], function (error, results, fields) {
            if (error) {
                console.log(error);
            }
            // Neat!
        });


    }

});
