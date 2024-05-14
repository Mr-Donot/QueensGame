function createGrid(map){
    let caseNumber = map["caseNumber"];
    let grid = document.querySelector("#grid");
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    grid.style.gridTemplateRows = `repeat(${caseNumber}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${caseNumber}, 1fr)`;
    grid.style.gap = "" + (15 - caseNumber > 0 ? 15-caseNumber : 1) + "px";
    grid.style.width = "" + caseNumber*60 + "px";
    grid.style.height = "" + caseNumber*60 + "px";
    for (let line=0 ; line < caseNumber ; line++){
        let divLine = document.createElement("div");
        divLine.id = "line-" + line;
        divLine.classList.add("line");
        for (let square=0 ; square < caseNumber ; square++){
            let divSquare = document.createElement("div");
            divSquare.id = "case-" + line + "-" + square;
            divSquare.classList.add("case");
            divSquare.style.backgroundColor = color1[map["colorGrid"][line][square]];
            divLine.appendChild(divSquare);
        }
        grid.appendChild(divLine);
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
        caseElement.appendChild(imgElement);
    })
}

function addClickEventToCases() {
    var imgs = document.querySelectorAll('.crown');

    function changeVisibilityCrownOnClick(event) {
        var imgElement = event.target;
        imgElement.style.visibility = (imgElement.style.visibility=="hidden" ? "visible" : "hidden");
    }

    imgs.forEach(function(elem) {
        elem.addEventListener('click', changeVisibilityCrownOnClick);
    });

    var cases = document.querySelectorAll('.case');
    function changeVisibilityCrownInsideCaseOnClick(event) {
        var imgElement = event.target.getElementsByTagName('img')[0];
        if (imgElement != undefined) {     
            imgElement.style.visibility = (imgElement.style.visibility=="hidden" ? "visible" : "hidden");
   
        }
    }
    cases.forEach(function(elem) {
        elem.addEventListener('click', changeVisibilityCrownInsideCaseOnClick);
    });
}


function launchMap(mapName){
    let map = maps[mapName];
    createGrid(map);
    addHiddenCrown();
    addClickEventToCases();
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