import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";


function saveWinInDB(){
    const db = getDatabase();
    set(ref(db, 'wins/' + currentMap),
    {
      map: currentMap,
      timer:0,
    });
}