var fs = require('fs');
var pdf = require('html-pdf');
// var html = fs.readFileSync('./cards.html', 'utf8');
var options = {
    format: 'Letter',
    orientation: 'landscape'
};
const mongojs = require('mongojs')
const db = mongojs('gratitude', ['thankyou']);

db["thankyou"].find(function (err, docs) {
    mainFun(docs);
});




const template = cards => `
<html>
<style>
    #main {
        display: flex;
        flex-direction: row;
        margin-right: 10%;

    }

    .posy {
        border: solid 1px black;
        width: 45%;
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
    ${cards}

    </div>
</body>

</html>`;

const createCard = (dat) => `
<div class="card posy">
<div class="card-content">
    <h3 class="card-title">General</h3>
    <hr>
    <ol id="bullets">
        ${dat.entry}
    </ol>
</div>
</div>
`;

function mainFun(docs) {

    let temArr = docs.map((val) => {
        return createCard(val);

    });


    const html = template(temArr);
    renderpdf(html);
}

function renderpdf(html) {
    pdf.create(html, options).toFile('./businesscard.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });
}