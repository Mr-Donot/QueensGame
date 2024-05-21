import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";


function saveWinInDB(){
    var username = document.querySelector("#username").value;
    if (username == ""){
      console.log("entrez un nom !")
      return;
    }
    const db = getDatabase();
    set(ref(db, 'user/' + username),
    {
      map: currentMap,
      timer:0,
    });
    closePopup();
}

document.querySelector("#save-button").addEventListener("click", saveWinInDB);