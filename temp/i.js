var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'planes'
});


const testFolder = '/Users/rosty/Development/planes/frontend/src/assets/airlines/';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {


        let f = file.substr(0, 3);
connection.query('SELECT code FROM airline WHERE code = ?', [f], function (error, results, fields) {


    if (results.length == 0) {

        fs.unlink('/Users/rosty/Development/planes/frontend/src/assets/airlines/' + f + '.png');
        console.log(f);
    }


});

        //console.log(f);

});
});

/**/
