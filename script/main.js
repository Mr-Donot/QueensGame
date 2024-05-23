let gameState = [];
let blocks = {};
let currentMap = "";
let currentColor = colors["color1"];

document.querySelector("#save-button").addEventListener("click", saveWinInDB);

function fillColorSelectBox(){
    let selector = document.querySelector("#colorSelector");
    for (var colorName in colors){
        let optionBalise = document.createElement("option");
        optionBalise.value = colorName;
        optionBalise.textContent = "Palette : " + colors[colorName]["name"];
        selector.appendChild(optionBalise);
    }
}

function paintCase(){
    currentColor = colors[document.querySelector("#colorSelector").value];
    let map = maps[currentMap];
    let cases = document.querySelectorAll(".case");
    cases.forEach(function(caseElement) {
        let id = caseElement.id;
        let row = id.split("-")[1];
        let col = id.split("-")[2];
        caseElement.style.backgroundColor = currentColor[map["colorGrid"][row][col]];
    });
}

function fillMapSelectBox(){
    let selector = document.querySelector("#mapSelector");
    for (var mapName in maps){
        let optionBalise = document.createElement("option");
        optionBalise.value = mapName;
        optionBalise.textContent = maps[mapName]["name"];
        selector.appendChild(optionBalise);
    }
}

function showPopup() {
    document.getElementById('victory-popup').style.display = 'flex';
}
  
function closePopup() {
    document.getElementById('victory-popup').style.display = 'none';
    launchMap(currentMap);
}
  
fillColorSelectBox();
fillMapSelectBox();
buttonRandomMapOnClick();
buttonSelectMapOnClick();

document.querySelector("#colorSelector").addEventListener("change", paintCase);

