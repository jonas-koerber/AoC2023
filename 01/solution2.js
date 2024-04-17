const fs    = require('node:fs');

let input   = fs.readFileSync('input.txt', { encoding: 'utf8' }),
    data    = input.split(/\r?\n|\r|\n/g),
    numbers = "123456789".split("").concat("hello one two three four five six seven eight nine".split(" ")),
    helper  = "nvll one two three four five six seven eight nine".split(" ");
    sum     = 0;

data.forEach(line => {

    let found = "";
    let results = [[99999999,""],[-1,""]];

    numbers.forEach(n => {
        let i = line.indexOf(n);
        if(i < results[0][0] && i > -1) {
            results[0][0] = i;
            results[0][1] = n;
        }

        let j = line.lastIndexOf(n);
        if(j > results[1][0] && j > -1) {
            results[1][0] = j;
            results[1][1] = n;
        }
    })

    let low = results[0][1];
    if(isNaN(low)) { low = helper.indexOf(low); };
    let high = results[1][1];
    if(isNaN(high)) { high = helper.indexOf(high); };

    found += "" + low + "" + high;

    sum += parseInt(found);

});

console.log(sum); // 54249