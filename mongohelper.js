const mongojs = require('mongojs')
const db = mongojs('gratitude', ['thankyou']);
const thanksArr = ["my life", "mom", "dad", "jen", "jeff", "jules", "time spent with toby", "gramsie", "poppa", "all my cousins", "my upbringing", "Our Lady", "Gemma", "St. Padre Pio", "St. John Vianney", "St. Teresa of Avila", "St. Therese", "St. Faustina", "St. John Paul II", "St. John of the Cross", "Jesus and His passion", "the rosary", "Eucharist", "Confession", "daily mass", "my intellect", "my relationship with parents", "Dr. Heim", "Dr. Sadoff", "Alexian Brothers", "Brother Dominic", "Fr. Hoehn", "The Holmans", "Father Parker", "Father Matthew", "Father Mike Schmidtz", "Father Paul", "Father Putnam", "Father Cory", "Father Becker", "Father Noah", "my health", "Jay", "David Kanwisher", "Evgheni", "Trevor", "Dale", "Caroline", "all God's forgiveness", "Dan (SA)", "Tyler (SA)", "HP (SA)", "Brian (SA)", "Matt Fradd", "Integrity Restored", "St John Vianney Parish Chicago", "my tutoring job", "my TA job", "Interior Castle", "Life of St Teresa of Avila", "my guardian angel", "all graces given while under the influence", "my friendship with Jay", "my time at University of Chicago", "my sexuality", "all times God has protected me from occasions of sin", "that great consolation praying rosary in room ('Ave Maria, Sancta Maria')"];
const bulk = db["thankyou"].initializeOrderedBulkOp();


thanksArr.forEach((val) => {
    bulk.insert({
        entry: "I am thankful for" + val,
        type: "general"
    });
});

bulk.execute(function (err, res) {
    console.log(res);
});

// db["thankyou"].insert({entry: "something", type: "night"});