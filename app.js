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
        width: 42%;
        height: 31%;
        padding: 5px;
        float: left;

    }
    li{
        margin: 3px;
        font-size: 10px;
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

const createCard = (block) => `
<div class="card posy">
<div class="card-content">
    <h3 class="card-title">General</h3>
    <hr>
    <ol>
        ${block}
    </ol>
</div>

</div>
`;

const liEntry = (li) => `
<li> ${li} </li>
`;

function mainFun(docs) {
    const liArr = docs.map(val => val.entry);
    console.log(liArr.length);
    const fiveLiArr = [];
    while (liArr.length > 0) {
        let tempArr = []
        for (let i = 0; i < 5; i++) {
            tempArr.push(liArr.splice(randNum(liArr.length), 1).join(''));
        }
        fiveLiArr.push(tempArr);
    }
    console.log(fiveLiArr);
    
    const liTempl = fiveLiArr.map((val, index) => {
        let tval = '';
        for (let i = 0; i < 5; i++){
            tval += liEntry(val[i]);
    //     return createCard(liTempl);
        }
        return createCard(tval);
    });
    console.log(liTempl);

    const html = template(liTempl);
    renderpdf(html);
}

function randNum(arrlen) {
    return Math.floor(Math.random() * arrlen);

}

function renderpdf(html) {
    pdf.create(html, options).toFile('./thanksyou.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res);
    });
}