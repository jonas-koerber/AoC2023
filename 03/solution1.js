const fs    = require('node:fs');

let input   = fs.readFileSync('input.txt', { encoding: 'utf8' }),
    data    = input.split(/\r?\n|\r|\n/g).map(row => row.split("")),
    result  = 0;

data.forEach((row, rowId) => {
    let currentNumber = resetCurrentNumber(),
        allRowNumbers = [];

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
            allRowNumbers.push(currentNumber);
            currentNumber = resetCurrentNumber();
        }
    })

    allRowNumbers.forEach(number => {
        let validNumber = false;

        for (let i = -1; i <= (number.highIndex[1] - number.lowIndex[1] + 1); i++) {
            if(validNumber) break;
            if(number.lowIndex[1] == 0 && i == -1) continue;
            if(number.highIndex[1] == (data[number.highIndex[0]].length - 1)) continue;

            // Check top
            if(number.lowIndex[0] != 0) validNumber = checkValid((number.lowIndex[0] - 1), (number.lowIndex[1] + i));
            if(validNumber) break;

            // Check middle
            validNumber = checkValid((number.lowIndex[0]), (number.lowIndex[1] + i));
            if(validNumber) break;
            
            // Check bottom
            if(number.lowIndex[0] != (data.length - 1)) validNumber = checkValid((number.lowIndex[0] + 1), (number.lowIndex[1] + i));
        }

        if(validNumber) result += number.value;
    });

})

console.log(result); // 546563



// Helper Function
function resetCurrentNumber() {
    return {
        value: "",
        lowIndex: [0,0],
        highIndex: [0,0]
    };
}

function checkValid(x, y) {
    return (isNaN(data[x][y]) && data[x][y] != ".")
}