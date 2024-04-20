const fs    = require('node:fs');

let input   = fs.readFileSync('input.txt', { encoding: 'utf8' }),
    data    = input.split(/\r?\n|\r|\n/g).map(row => row.split("")),
    result  = 0,
    numbers = [],
    gears   = [],
    valid   = [];

data.forEach((row, rowId) => {
    let currentNumber = resetCurrentNumber();

    row.forEach((col, colId) => {
        if(!isNaN(col)) {
            if(currentNumber.value == "") {
                currentNumber.lowIndex = [rowId, colId];
            }
            currentNumber.value += col;
        }
        if((isNaN(col) || colId == (row.length - 1)) && currentNumber.value != "" ) {
            currentNumber.highIndex = [rowId, colId-1];
            currentNumber.value = parseInt(currentNumber.value);
            numbers.push(currentNumber);
            currentNumber = resetCurrentNumber();
        }
        if(col == "*") {
            gears.push([rowId, colId]);
        }
    })

})

gears.forEach(gear => {
    let validGear = [];

    for (let i = -1; i <= 1; i++) {
        if(gear[1] == 0 && i == -1) continue;
        if(gear[1] == (data[gear[0]].length - 1)) continue;

        // Check top
        if(gear[0] != 0) checkValid((gear[0] - 1), (gear[1] + i)) ? validGear.push([(gear[0] - 1), (gear[1] + i)]) : null;
    }


    for (let i = -1; i <= 1; i++) {
        if(gear[1] == 0 && i == -1) continue;
        if(gear[1] == (data[gear[0]].length - 1)) continue;

        // Check middle
        checkValid((gear[0]), (gear[1] + i)) ? validGear.push([(gear[0]), (gear[1] + i)]) : null;
    }

    for (let i = -1; i <= 1; i++) {
        if(gear[1] == 0 && i == -1) continue;
        if(gear[1] == (data[gear[0]].length - 1)) continue;
        
        // // Check bottom
        if(gear[0] != (data.length - 1)) checkValid((gear[0] + 1), (gear[1] + i)) ? validGear.push([(gear[0] + 1), (gear[1] + i)]) : null;
    }
        

    if(validGear.length >= 2) {
        let helper = null;
        validGear = validGear.filter(match => {

            if(helper == null) {
                helper = match;
                return true;
            }

            if(match[1] - helper[1] == 1 && match[0] == helper[0]) {
                helper = match;
                return false;
            }
            
            if(match[1] - helper[1] == -1 && match[0] == helper[0]) {
                helper = match;
                return false;
            }

            // not same row
            if(match[0] != helper[0]) {
                helper = match;
                return true;
            }

            if(match[1] - helper[1] > 1 || match[1] - helper[1] < -1) {
                helper = match;
                return true;
            }

            return false;
        });
    }

    if(validGear.length == 2) {
        valid.push(gear);
    }

})

valid.forEach(gear => {

    let gearNumbers = [];

    numbers.forEach(number => {

        if( (
                gear[1] >= (number.lowIndex[1] -1)
                && gear[1] <= (number.highIndex[1] + 1)
            )   
            && 
            (
                gear[0] ==  number.lowIndex[0] - 1
                || gear[0] ==  number.lowIndex[0]
                || gear[0] ==  number.lowIndex[0] + 1
            )
        ) {
            gearNumbers.push(number);
        }

    })


    let gearRatio = gearNumbers[0].value * gearNumbers[1].value;
    result += gearRatio;

})


console.log(result); // 91031374



// Helper Functions
function resetCurrentNumber() {
    return {
        value: "",
        lowIndex: [0,0],
        highIndex: [0,0]
    };
}

function checkValid(x, y) {
    return !isNaN(data[x][y]);
}
