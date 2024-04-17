const fs    = require('node:fs');

let input   = fs.readFileSync('input.txt', { encoding: 'utf8' }),
    data    = input.split(/\r?\n|\r|\n/g),
    numbers = "123456789".split(""),
    sum     = 0;
    

data.forEach(line => {

    let found = "";
    let splitted = line.split("");
    
    splitted.every(x => {
        if(numbers.indexOf(x) > -1) {
            found = x;
            return false;
        }
        return true;
    });

    for (let i = splitted.length; i > -1; i--) {
        let y = splitted[i];
        if(numbers.indexOf(y) > -1) {
            found += y;
            break;
        }
    }

    sum += parseInt(found);

});

console.log(sum); // 53194