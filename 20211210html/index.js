const express = require('express');
const { truncateSync } = require('fs');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { resolveMx } = require('dns');
var cors = require('cors');

//lets get validated by FreeCodeCamp
app.use(cors({optionsSuccessStatus: 200}));
//-----------------------------------------------------------------------------------------------------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log('Timestamp server is listening at port ' + port);
});

//Lets setup some basic Parsing and encoding
// app.use(bodyParser.json()) 
// app.use(bodyParser.urlencoded({ extended: true })) 
//-----------------------------------------------------------------------------------------------------


//Lets handle UNIX and UTC date inputs
let error = { error : 'Invalid Date' };
app.get('/api/:date_string', (req, res) => {

var date_string;
date_string = req.params.date_string;
console.log(date_string);
console.log(date_string.toString);
const d = new Date(parseInt(date_string));


var myUTCString;
var myUnix;
var myJSON;

            // var error = {error: "Invalid Date"};            
            // lets set up logic to handle a unix input
            if (!isNaN(date_string)) {
                date_string = parseInt(date_string);
                console.log(date_string);
                const d = new Date(date_string);
                myUTCString = d.toUTCString();
                myUnix = d.getTime(date_string);
                myJSON={unix: myUnix, utc: myUTCString}
                console.log(myUTCString);
                console.log(myUnix);
                console.log(myJSON);

                // res.send({unix: myUnix, utc: myUTCString});  
                // return res.send(myJSON);     
                return res.json(myJSON);
                    
                        }
        
            // lets set up logic to handle UTC string input
            if (date_string.includes("-")) {
                
                myUTCString = d.toUTCString();
                myUnix = d.getTime(date_string);
                myJSON={unix: myUnix, UTC: myUTCString}
                // res.send({unix: myUnix, utc: myUTCString}); 
                // return res.send(myJSON);
                return res.json({unix: myUnix, utc: myUTCString})
               
                            }
            
      
           else {
               console.log(error);
               return res.json(error);
              
           }
                           
            
})
    //lets set up logic to handle an empty string param
app.get('/api/', (req, res) => {
    const now = new Date();
                myUTCString = now.toUTCString();
                myUnix = now.getTime();
                myJSON={unix: myUnix, utc: myUTCString}
                // console.log("empty string");
                // return res.send(myJSON);
                return res.json({unix: myUnix, utc: myUTCString})
                
})