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
    grid.style.width = (window.innerWidth > 768 ? "450px": "700px");
    grid.style.height = (window.innerWidth > 768 ? "450px": "700px");
    for (let line=0 ; line < caseNumber ; line++){
        let divLine = document.createElement("div");
        divLine.id = "line-" + line;
        divLine.classList.add("line");
        let tempLine = [];
        for (let square=0 ; square < caseNumber ; square++){
            let divSquare = document.createElement("div");
            divSquare.id = "case-" + line + "-" + square;
            divSquare.classList.add("case");
            divSquare.style.backgroundColor = currentColor[map["colorGrid"][line][square]];
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
        startChronometer();
        var imgElement = event.target;
        let index = imgElement.id.split("-");
        
        if (gameState[index[1]][index[2]] == 1){ // QUEEN -> EMPTY
            gameState[index[1]][index[2]] = 0; 
            imgElement.style.visibility = "hidden";
        } else if (gameState[index[1]][index[2]] == 0){ // EMPTY -> MARKER
            gameState[index[1]][index[2]] = -1;
            imgElement.style.visibility = "visible";
            imgElement.style.background = "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,212,255,0) 76%)";
        } else { // MARKER -> QUEEN
            gameState[index[1]][index[2]] = 1;
            imgElement.style.visibility = "visible";
            imgElement.style.background = "rgba(0, 0, 0, 0)";
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
            startChronometer();    
            
            let index = imgElement.id.split("-");
            if (gameState[index[1]][index[2]] == 1){ // QUEEN -> EMPTY
                gameState[index[1]][index[2]] = 0; 
                imgElement.style.visibility = "hidden";
            } else if (gameState[index[1]][index[2]] == 0){ // EMPTY -> MARKER
                gameState[index[1]][index[2]] = -1;
                imgElement.style.visibility = "visible";
                imgElement.style.background = "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,212,255,0) 76%)";
            } else { // MARKER -> QUEEN
                gameState[index[1]][index[2]] = 1;
                imgElement.style.visibility = "visible";
                imgElement.style.background = "rgba(0, 0, 0, 0)";
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

        let sumRow = 0;
        for (j = 0; j < gameState[i].length ; j++){
            sumRow += Math.max(0,gameState[i][j]);
        }
        if (sumRow != 1){
            return false;
        }
        let sumCol = 0;

        for (j = 0; j < gameState[i].length ; j++){
            sumCol += Math.max(0,gameState[j][i]);
        }

        if (sumCol != 1){
            return false;
        }
    }
    //TODO : check diagonals
    for (i=1;i<gameState.length - 1 ; i++){
        for (j=1;j<gameState.length - 1 ; j++){
            let val_center = gameState[i][j];
            if (val_center == 1){
                if (gameState[i-1][j-1] == 1) {
                    return false;
                }
                if (gameState[i-1][j+1]==1) {
                    return false;
                }
                if (gameState[i+1][j-1]==1) {
                    return false;
                }
                if (gameState[i+1][j+1]==1) {
                    return false;
                }
            }
        }    
    }

    //check by color
    for (var key in blocks){
        let sumBlock = 0;
        for (i = 0 ; i < blocks[key].length ; i++){
            sumBlock += Math.max(0,gameState[blocks[key][i][0]][blocks[key][i][1]]);
        }
        if (sumBlock > 1) {
            return false;
        }
    }

    stopChronometer();
    showPopup();

    return true;
}


function fillBlocks(colorGrid){
    blocks = {}
    let i;
    let j;
    for (i=0;i<colorGrid.length ; i++){
        for (j=0;j<colorGrid[i].length ; j++){
            if (""+colorGrid[i][j] in blocks){
                blocks[""+colorGrid[i][j]].push([i,j]);
            }
            else{
                blocks[""+colorGrid[i][j]] = [[i,j]];
            }
        }
    }
}

function launchMap(mapName){
    let map = maps[mapName];
    resetChronometer();
    fillBlocks(map["colorGrid"]);
    createGrid(map);
    addHiddenCrown();
    addClickEventToCases(mapName);
}

function buttonRandomMapOnClick(){
    let button = document.querySelector("#buttonRandomPlay");
    button.addEventListener("click", ()=>{
        arrayMaps = Object.keys(maps);
        let choice = arrayMaps[Math.floor(Math.random() * arrayMaps.length)];
        if (choice != ""){
            currentMap = choice;
            document.querySelector("#mapSelector").value = choice;
            launchMap(choice);
        }
    })
}

function buttonSelectMapOnClick(){
    let button = document.querySelector("#buttonPlay");
    button.addEventListener("click", ()=>{
        let choice = document.querySelector("#mapSelector").value;
        if (choice != ""){
            currentMap = choice;
            launchMap(choice);
        }
    })
}