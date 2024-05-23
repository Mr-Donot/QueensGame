import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

async function saveWinInDB() {
    var username = document.querySelector("#username").value;
    if (username == "") {
        console.log("Entrez un nom !");
        return;
    }

    var timer = document.querySelector("#chronometer").innerHTML;
    const db = getDatabase();
    const userRef = ref(db, 'user/' + username + '/' + currentMap);

    try {
        const snapshot = await get(userRef);
        const mapData = snapshot.val();

        if (!mapData || !mapData.timer) {
            // If no existing data for this user or map or no timer data, save directly
            saveNewData(timer);
            return;
        }

        const bestTimer = mapData.timer;

        // Compare the timers
        if (compareTimers(timer, bestTimer) < 0) {
            // If the new timer is better, update the database
            saveNewData(timer);
        } else {
            console.log("Existing timer is better. Not updating.");
            closePopup();
        }
    } catch (error) {
        console.error("Error fetching map data:", error);
    }
}

function compareTimers(timer1, timer2) {
    // Assuming timer format is HH:MM:SS
    const [hours1, minutes1, seconds1] = timer1.split(":").map(Number);
    const [hours2, minutes2, seconds2] = timer2.split(":").map(Number);

    // Compare hours
    if (hours1 !== hours2) {
        return hours1 - hours2;
    }
    
    // Compare minutes
    if (minutes1 !== minutes2) {
        return minutes1 - minutes2;
    }

    // Compare seconds
    return seconds1 - seconds2;
}

async function saveNewData(timer) {
    const username = document.querySelector("#username").value;
    const db = getDatabase();
    
    try {
        await set(ref(db, 'user/' + username + '/' + currentMap), { "timer":timer, "date": getFormattedDateTime()});
        console.log("New timer saved successfully.");
        closePopup();
    } catch (error) {
        console.error("Error saving new timer:", error);
    }
}

function getFormattedDateTime() {

    const now = new Date();
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
  
    const formattedDateTime = `${year}-${month}-${day}-${hour}-${minute}-${second}`;
  
    return formattedDateTime;
  }

document.querySelector("#save-button").addEventListener("click", saveWinInDB);