const fs    = require('node:fs');

let input   = fs.readFileSync('input.txt', { encoding: 'utf8' }),
    data    = input.split(/\r?\n|\r|\n/g),
    result  = 0;

data.forEach(game => {

    let rounds   = game.split(":")[1].split(";").map(round => round.split(",").map(turn => turn.trim())),
        needed   = {
            red: 0,
            green: 0,
            blue: 0
        }

    rounds.forEach(round => {
        round.forEach(turn => {
            let split = turn.split(" ");
            if(needed[split[1]] < parseInt(split[0])) {
                needed[split[1]] = parseInt(split[0]);
            }
        })
    })

    result += (needed.red * needed.green * needed.blue);
})

console.log(result); // 68638