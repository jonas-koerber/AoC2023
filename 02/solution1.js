const fs    = require('node:fs');

let input   = fs.readFileSync('input.txt', { encoding: 'utf8' }),
    data    = input.split(/\r?\n|\r|\n/g),
    result  = 0,
    limit   = {
        red: 12,
        green: 13,
        blue: 14
    };

data.forEach(game => {

    let game_id  = parseInt(game.split(":")[0].replace("Game", "").trim()),
        rounds   = game.split(":")[1].split(";").map(round => round.split(",").map(turn => turn.trim())),
        possible = true;

    rounds.forEach(round => {
        round.forEach(turn => {
            let split = turn.split(" ");
            if(limit[split[1]] < parseInt(split[0])) {
                possible = false;
            }
        })
    })

    if(possible) {
        result += game_id;
    }
})

console.log(result); // 2776