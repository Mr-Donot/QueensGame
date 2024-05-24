import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBmqcJVph_jsTZVBCt2tChGFlqia6jB-o4",
    authDomain: "test-queens-game.firebaseapp.com",
    databaseURL: "https://test-queens-game-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test-queens-game",
    storageBucket: "test-queens-game.appspot.com",
    messagingSenderId: "423803906034",
    appId: "1:423803906034:web:d2804f284c0175874f2d6b",
    measurementId: "G-9L5RKZ5P2R"
};

document.getElementById("username").innerHTML = JSON.parse(localStorage.getItem('username')).username;

async function saveWinInDB() {
    var username = document.getElementById("username").innerHTML;
    if (username === "") {
        console.log("Entrez un nom !");
        return;
    }

    var timer = document.querySelector("#chronometer").innerHTML;
    const db = getDatabase();
    const userRef = ref(db, 'users/' + JSON.parse(localStorage.getItem('user')).uid + '/maps/' + currentMap);

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
    // Assuming timer format is HH:MM:SS.mmm
    const [time1, milliseconds1] = timer1.split(".");
    const [time2, milliseconds2] = timer2.split(".");

    const [hours1, minutes1, seconds1] = time1.split(":").map(Number);
    const [hours2, minutes2, seconds2] = time2.split(":").map(Number);

    // Compare hours
    if (hours1 !== hours2) {
        return hours1 - hours2;
    }

    // Compare minutes
    if (minutes1 !== minutes2) {
        return minutes1 - minutes2;
    }

    // Compare seconds
    if (seconds1 !== seconds2) {
        return seconds1 - seconds2;
    }

    // Compare milliseconds
    return milliseconds1 - milliseconds2;
}

async function saveNewData(timer) {
    const db = getDatabase();
    
    try {
        await set(ref(db, 'users/' + JSON.parse(localStorage.getItem('user')).uid + '/maps/' + currentMap), { "timer": timer, "date": getFormattedDateTime() });
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
