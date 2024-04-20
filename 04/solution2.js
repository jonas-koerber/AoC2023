const fs    = require('node:fs');

let input   = fs.readFileSync('input.txt', { encoding: 'utf8' }),
    data    = input.split(/\r?\n|\r|\n/g),
    games   = {},
    result  = 0;
    
data.forEach((row, rowId) => {
    games[rowId] = 1;
});

data.forEach((row, rowId) => {

    let numbers = row.split(":")[1].split("|"),
        winning = numbers[0].split(" ").map(n => n.trim()).filter(function(e) { return e != '' }),
        played  = numbers[1].split(" ").map(n => n.trim()).filter(function(e) { return e != '' }),
        matches = 0;

    winning.forEach(w => {
        if(played.indexOf(w) !== -1) {
            matches++;
        }
    })

    for (let i = 1; i <= matches; i++) {
        games[rowId + i] += games[rowId];
    }
})

Object.values(games).forEach(cards => {
    result += parseInt(cards);
});

console.log(result); // 5132675
