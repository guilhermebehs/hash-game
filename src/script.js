let isX = true;
let numberOfMoves = 0;

generateTable();

function generateTable(){
    const table = document.getElementById("table");
    for(let i=0; i < 3; i++){
        const id = i;
        table.insertAdjacentHTML("beforeend", `<div class="line" id="${id}"></div>`)
        const line = document.getElementById(id);
        for(let y=0; y < 3; y++){
            const blockId = `${i}${y}`;
            line.insertAdjacentHTML("beforeend", `<div class="block" id="${blockId}"></div>`)
            const block = document.getElementById(blockId);
            block.addEventListener("click", ()=> onClickBlock(block))
        }
    }
}

function onClickBlock(block){
    const value = block.innerHTML;
    if(value) return;
    block.innerHTML = `<div class="${isX? 'x': 'o'}">${isX?  'X': ''}</div>`;
    numberOfMoves++;
    if(numberOfMoves >= 5) checkWinner(isX? 'x': 'o');
    if(numberOfMoves === 9) declareDraw();
    isX = !isX;
}

function checkWinner(lastMoveSymbol){
    checkLines(lastMoveSymbol);
    checkColumns(lastMoveSymbol);
    checkDiagonals(lastMoveSymbol);

}

function checkLines(lastMoveSymbol){
    [0,1,2].forEach(lineNumber => checkLine(lineNumber, lastMoveSymbol))
}

function checkLine(lineNumber, lastMoveSymbol){}

function checkColumns(lastMoveSymbol){
    [0,1,2].forEach(columnNumber => checkColumn(columnNumber, lastMoveSymbol))
}

function checkColumn(columnNumber, lastMoveSymbol){}

function checkDiagonals(lastMoveSymbol){
    [0,3].forEach(diagonalNumber => checkDiagonal(diagonalNumber, lastMoveSymbol))
}

function checkDiagonal(lineNumber, lastMoveSymbol){}

function declareWinner(lastMoveSymbol){
    alert(`The winner is ${lastMoveSymbol}`);
    restartGame();
}


function declareDraw(){
    alert(`Draw`);
    restartGame();
}

function restartGame(){
    const table = document.getElementById("table");
    table.innerHTML = "";
    isX = true;
    numberOfMoves = 0;
    generateTable();
}