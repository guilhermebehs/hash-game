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
    const id = `${isX? 'x': 'o'}_${block.id}`;
    block.innerHTML = `<div class="${isX? 'x': 'o'}" id="${id}">${isX?  'X': ''}</div>`;
    numberOfMoves++;
    if(numberOfMoves >= 5) checkWinner(isX? 'x': 'o');
    if(numberOfMoves === 9) showResult('Draw!');
    isX = !isX;
}

function checkWinner(lastMoveSymbol){

    const blocks = document.getElementsByClassName(lastMoveSymbol);
    const blocksMapped = Array.from( blocks)
        .map(({id}) => {const [_, lineColumn] = id.split('_'); return lineColumn.split('')})

    checkLines(lastMoveSymbol,blocksMapped);
    checkColumns(lastMoveSymbol, blocksMapped);
    checkDiagonals(lastMoveSymbol, blocksMapped);

}

function checkLines(lastMoveSymbol, blocksMapped){
    for(let i =0; i < 3; i++)
       if(checkLine(i, blocksMapped)){
          showResult(`Winner: ${lastMoveSymbol}`);
          break;
       }
}

function checkColumns(lastMoveSymbol, blocksMapped){
    for(let i =0; i < 3; i++)
       if(checkColumn(i, blocksMapped)){
        showResult(`Winner: ${lastMoveSymbol}`);
        break;
       }
}

function checkDiagonals(lastMoveSymbol, blocksMapped){
    if(checkDiagonal(blocksMapped,0,0) || checkDiagonal(blocksMapped,0,-2))
       showResult(`Winner: ${lastMoveSymbol}`);
}

function checkLine(lineNumber, blocksMapped){
    const linesFiltered = blocksMapped.filter(([line])=> Number(line) === lineNumber)
    return linesFiltered.length === 3;
}

function checkColumn(columnNumber, blocksMapped){
    const columnsFiltered = blocksMapped.filter(([_,column])=> Number(column) === columnNumber)
    return columnsFiltered.length === 3;
}

function checkDiagonal(blocksMapped, diagonalFactorLine, diagonalFactorColumn){
    const diagonalsFiltered =blocksMapped
       .filter(([line,column])=> Number(line) === Math.abs(diagonalFactorLine++) 
           && Number(column) === Math.abs(diagonalFactorColumn++))

    return diagonalsFiltered.length === 3;     
}

function showResult(result){
    alert(result);
    restartGame();
}

function restartGame(){
    const table = document.getElementById("table");
    table.innerHTML = "";
    isX = true;
    numberOfMoves = 0;
    generateTable();
}