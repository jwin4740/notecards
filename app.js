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
        width: 37%;
        height: 32%;
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
        <div class="card posy">
            <div class="card-content">
                <h3 class="card-title">Night (slip)</h3>
                <hr>
                <ol>
                    <li> I am thankful for God's mercy and forgiveness</li>
                    <li> I am thankful for God's patience with me' </li>
                    <li> I am thankful for God removing my desire for alcohol </li>
                    <li> I am thankful for the progess God has given to me in knowledge of sexuality </li>
                  
                </ol>
            </div>   
        </div>
        <div class="card posy">
            <div class="card-content">
                <h3 class="card-title">Night</h3>
                <hr>
                <ol>
                    <li> I am SO thankful for the grace of a day without masturbation</li>
                    <li> I am thankful for my siblings college experience </li>
                    <li> I am thankful for God removing my desire for alcohol </li>
                    <li> I am thankful for the progess God has given to me in knowledge of sexuality </li>
                    <li> I am thankful for music </li>
                
                </ol>
            </div>
        </div> 
       
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
    const fiveLiArr = [];
    while (liArr.length > 0) {
        let tempArr = []
        for (let i = 0; i < 5; i++) {
            tempArr.push(liArr.splice(randNum(liArr.length), 1).join(''));
        }
        fiveLiArr.push(tempArr);
    }

    
    const liTempl = fiveLiArr.map((val, index) => {
        let tval = '';
        for (let i = 0; i < 5; i++){
            tval += liEntry(val[i]);
    //     return createCard(liTempl);
        }
        return createCard(tval);
    });


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