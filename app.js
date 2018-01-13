var fs = require('fs');
var pdf = require('html-pdf');
// var html = fs.readFileSync('./cards.html', 'utf8');
var options = { format: 'Letter', orientation: 'landscape' };


let arr = [1,4,5,6];

const template = `
<html>
<style>
    #main {
        display: flex;
        flex-direction: row;
        margin-right: 10%;
       
    }

    .posy {
        border: solid 2px black;
        width: 43%;
        height: 30%;
        padding: 10px;
        float: left;
      
    }
    li{
        margin: 5px;
        font-size: 12px;
    }
    h3{
        margin: 5px;
    }
</style>

</head>

<body>
    <div id="main">
        <div class="card posy">
            <div class="card-content">
                <h3 class="card-title">General</h3>
                <hr>
                <ol id="bullets">
                    <li>hello</li>
                    <li>hello</li>
                    <li>hello</li>
                    <li>hello</li>
                    <li>hello</li>
                </ol>
            </div>
        </div>

                
           
        <div class="card posy">
            <div class="card-content">
                <h3 class="card-title">General</h3>
                <hr>
                <ol id="bullets">
                    <li>hello</li>
                    <li>hello</li>
                    <li>hello</li>
                    <li>hello</li>
                    <li>hello</li>
                </ol>
            </div>
        </div>
   
    </div>
</body>

</html>


`;
console.log(template);

pdf.create(template, options).toFile('./businesscard.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });





