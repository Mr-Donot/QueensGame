function createGrid(map){
    let caseNumber = map["caseNumber"];
    let grid = document.querySelector("#grid");
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    gameState = [];
    grid.style.gridTemplateRows = `repeat(${caseNumber}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${caseNumber}, 1fr)`;
    grid.style.gap = "" + (15 - caseNumber > 0 ? 15-caseNumber : 1) + "px";
    grid.style.width = "" + caseNumber*60 + "px";
    grid.style.height = "" + caseNumber*60 + "px";
    for (let line=0 ; line < caseNumber ; line++){
        let divLine = document.createElement("div");
        divLine.id = "line-" + line;
        divLine.classList.add("line");
        let tempLine = [];
        for (let square=0 ; square < caseNumber ; square++){
            let divSquare = document.createElement("div");
            divSquare.id = "case-" + line + "-" + square;
            divSquare.classList.add("case");
            divSquare.style.backgroundColor = color1[map["colorGrid"][line][square]];
            divLine.appendChild(divSquare);
            tempLine.push(0);
        }
        grid.appendChild(divLine);
        gameState.push(tempLine);
    }
}

function addHiddenCrown(){
    var cases = document.querySelectorAll('.case');
    cases.forEach(function(caseElement) {
        var imgElement = document.createElement('img');
        imgElement.src = 'img/crown.png'; // Mettez à jour le chemin vers votre image
        imgElement.style.width = '100%'; // Assurez-vous que la taille de l'image correspond à celle de la case
        imgElement.style.height = '100%';
        imgElement.style.visibility = 'hidden';
        imgElement.classList.add("crown");
        imgElement.id = "img-" + caseElement.id.split("-")[1] + "-" + + caseElement.id.split("-")[2]
        caseElement.appendChild(imgElement);
    })
}

function addClickEventToCases(mapName) {
    //listener for img
    var imgs = document.querySelectorAll('.crown');

    function changeVisibilityCrownOnClick(event) {
        var imgElement = event.target;
        imgElement.style.visibility = (imgElement.style.visibility=="hidden" ? "visible" : "hidden");
        let index = imgElement.id.split("-");
        if (imgElement.style.visibility == "visible"){
            gameState[index[1]][index[2]] = 1;
        }
        else{
            gameState[index[1]][index[2]] = 0;
        }
        checkWin(mapName);
    }

    imgs.forEach(function(elem) {
        elem.addEventListener('click', changeVisibilityCrownOnClick);
    });

    //listener for div
    var cases = document.querySelectorAll('.case');
    function changeVisibilityCrownInsideCaseOnClick(event) {
        var imgElement = event.target.getElementsByTagName('img')[0];
        if (imgElement != undefined) {     
            imgElement.style.visibility = (imgElement.style.visibility=="hidden" ? "visible" : "hidden");
            let index = imgElement.id.split("-");
            if (imgElement.style.visibility == "visible"){
                
                gameState[index[1]][index[2]] = 1;
            }
            else{
                gameState[index[1]][index[2]] = 0;
            }
            checkWin(mapName);
        }
    }
    cases.forEach(function(elem) {
        elem.addEventListener('click', changeVisibilityCrownInsideCaseOnClick);
    });


}

function checkWin(mapName){
    // check rows and cols
    let i;
    let j;

    for (i = 0; i < gameState.length ; i++){
        let sumRow = gameState[i].reduce((a, b) => a + b);
        if (sumRow != 1){
            console.log("loose row", sumRow, i);
            return false;
        }2
        let sumCol = 0;
        for (j = 0; j < gameState.length ; j++){
            sumCol += gameState[i][j];
        }
        if (sumCol != 1){
            console.log("loose col", sumCol, i, j);
            return false;
        }
    }
    //TODO : check diagonals
    for (i = 0 ; i < gameState.length -1 ; i++){
        let sumDiagRowNWtoSE = 0;
        let sumDiagColNWtoSE = 0;
        
        let sumDiagRowSEtoNW = 0;
        let sumDiagColSEtoNW = 0;

        for (j = 0 ; j < gameState.length - i ; j++){
            sumDiagRowNWtoSE += gameState[j][j+i];
            sumDiagColNWtoSE += gameState[j+i][j];

            sumDiagRowSEtoNW += gameState[j][gameState.length -1 - i - j];
            sumDiagColSEtoNW += gameState[j+i][gameState.length -1 - j];
        }
        if (sumDiagRowNWtoSE > 1){
            console.log("loose NWtoSE row", sumDiagRowNWtoSE, i, j);
            return false;
        }
        if (sumDiagColNWtoSE > 1){
            console.log("loose NWtoSE col", sumDiagColNWtoSE, i, j);
            return false;
        }
        if (sumDiagRowSEtoNW > 1){
            console.log("loose SEtoNW row", sumDiagRowSEtoNW, i, j);
            return false;
        }
        if (sumDiagColSEtoNW > 1){
            console.log("loose SEtoNW col", sumDiagColSEtoNW    , i, j);
            return false;
        }
    }

    //TODO : check by color
    console.log("win !");
    return true;
}


function launchMap(mapName){
    let map = maps[mapName];
    createGrid(map);
    addHiddenCrown();
    addClickEventToCases(mapName);
}

function buttonSelectMapOnClick(){
    let button = document.querySelector("#buttonPlay");
    button.addEventListener("click", ()=>{
        let choice = document.querySelector("#mapSelector").value;
        if (choice != ""){
            launchMap(choice);
        }
    })
}