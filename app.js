var fs = require('fs');
var pdf = require('html-pdf');
// var html = fs.readFileSync('./cards.html', 'utf8');
var options = {
    format: 'Letter',
    orientation: 'portrait'
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
        justify-content: space-around;
        width: 100%;
        margin-left: 8%;
    }

    .posy {
        border: solid 1px black;
        float: left;
        width: 26%;
        height: 23.45%;
        padding: 5px;
    }

    ol{
        padding-left: 15px;
    }
    li{
        margin: 2px;
        font-size: 8px;
    }
    h3{
        text-align: center;
        margin: 5px;
    }
</style>

</head>

<body>
    <div id="main">
        ${cards}  

        <div class="card posy">
            <div class="card-content">
                <h3 class="card-title">Night</h3>
                <hr>
                <ol>
                    <li> I am SO thankful for the grace of a day without masturbation</li>
                    <li> I am thankful for God removing my desire for alcohol </li>
                    <li> I am thankful for the progess God has given to me in knowledge of sexuality </li>
                    <li> I am thankful for God removing my depression </li>
                   
                </ol>
            </div>
        </div>
        <div class="card posy">
        <div class="card-content">
            <h3 class="card-title">BLHASTED</h3>
            <hr>
            <ol>
                <li> puzzle</li>
                <li> violin </li>
                <li> guitar </li>
                <li> bowling </li>
               
            </ol>
        </div>
    </div>
        <div class="card posy">
        <div class="card-content">
            <h3 class="card-title">RULES</h3>
            <hr>
            <ol>
                <li> no computer after 11:00 pm</li>
                <li> No internet right after or during exercise </li>
                <li> nap outside of room </li>
            </ol>
        </div>
    </div>
        <div class="card posy">
        <div class="card-content">
            <h3 class="card-title">Night (slip)</h3>
            <hr>
            <ol>
                <li> I am thankful for God's mercy and forgiveness</li>
                <li> I am thankful for God's patience with me </li>
                <li> I am thankful for God removing my desire for alcohol </li>
                <li> I am thankful for the progess God has given to me in knowledge of sexuality </li>

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
        for (let i = 0; i < 4; i++){
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
    pdf.create(html, options).toFile('./thankyous.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res);
    });
}

