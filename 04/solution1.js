const fs    = require('node:fs');

let input   = fs.readFileSync('input.txt', { encoding: 'utf8' }),
    data    = input.split(/\r?\n|\r|\n/g),
    result  = 0;

data.forEach(row => {

    let numbers = row.split(":")[1].split("|"),
        winning = numbers[0].split(" ").map(n => n.trim()).filter(function(entry) { return entry.trim() != ''; }),
        played  = numbers[1].split(" ").map(n => n.trim()).filter(function(entry) { return entry.trim() != ''; }),
        value   = "0";

    winning.forEach(w => {
        if(played.indexOf(w) !== -1) {
            if(value === "0") value = "1";
            else value += "0";
        }
    })

    result += parseInt( value, 2 );

})

console.log(result); // 21959
