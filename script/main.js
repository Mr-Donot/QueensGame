let gameState = [];
let blocks = {};
let currentMap = "";

function fillSelectBox(){
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
  

fillSelectBox();
buttonSelectMapOnClick();



