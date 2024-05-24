import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

async function getUsersMapCount() {
    const db = getDatabase();
    const usersRef = ref(db, 'users/');

    try {
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
            const usersData = snapshot.val();
            const userMapCounts = {};

            Object.keys(usersData).forEach(userID => {
                const username = usersData[userID]["name"];
                const maps = usersData[userID]["maps"];
                if (maps != null) {
                    userMapCounts[username] = Object.keys(maps).length;
                }
            });

            return userMapCounts;
        } else {
            console.log("No data available");
            return {};
        }
    } catch (error) {
        console.error("Error fetching users' maps count:", error);
        return {};
    }
}

async function getMapLeaderboard(mapId) {
    const db = getDatabase();
    const usersRef = ref(db, 'users/');

    try {
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
            const usersData = snapshot.val();
            const map_lb_values = [];

            Object.keys(usersData).forEach(userID => {
                const username = usersData[userID]["name"];
                const maps = usersData[userID]["maps"];
                if (maps && maps[mapId] && maps[mapId].timer) { // Add check for 'time' property
                    map_lb_values.push({
                        username: username,
                        timer: maps[mapId].timer
                    });
                }
            });
            return map_lb_values;
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        console.error("Error fetching map leaderboard:", error);
        return [];
    }
}


document.addEventListener('DOMContentLoaded', async function() {
    const users = await getUsersMapCount();

    function createLeaderboard(users) {
        const leaderboardElement = document.getElementById('leaderboard');
        const sortedUsers = Object.entries(users).sort((a, b) => b[1] - a[1]);
        leaderboardElement.innerHTML = '';
        sortedUsers.forEach(([name, score]) => {
            const userDiv = document.createElement('div');
            userDiv.className = 'user';
            userDiv.innerHTML = `<span class="username">${name}</span><span class="score">${score}</span>`;
            leaderboardElement.appendChild(userDiv);
        });
    }

    fillMapLeaderboardSelectBox();

    async function createMapLeaderboard(mapId) {
        const mapLeaderboardElement = document.getElementById('mapLeaderboard');
        const mapLeaderboard = await getMapLeaderboard(mapId);
        mapLeaderboardElement.innerHTML = '';
        mapLeaderboard.sort((a, b) => {
            const timeA = convertTimeToSeconds(a.timer);
            const timeB = convertTimeToSeconds(b.timer);
            return timeA - timeB;
        });
        mapLeaderboard.forEach(({ username, time }) => {
            const userDiv = document.createElement('div');
            userDiv.className = 'user';
            userDiv.innerHTML = `<span class="username">${username}</span><span class="time">${time}</span>`;
            mapLeaderboardElement.appendChild(userDiv);
        });
    }

    document.getElementById('navButton1').addEventListener('click', () => {
        document.querySelector('.leaderboard-container').style.display = 'block';
        document.querySelector('.map-leaderboard-container').style.display = 'none';
        createLeaderboard(users);
    });

    document.getElementById('navButton2').addEventListener('click', () => {
        document.querySelector('.leaderboard-container').style.display = 'none';
        document.querySelector('.map-leaderboard-container').style.display = 'block';
        fillMapLeaderboardSelectBox();
    });

    document.getElementById('mapSelect').addEventListener('change', async (event) => {
        const mapId = event.target.value;
        await createMapLeaderboard(mapId);
    });

    // Initial creation of the global leaderboard
    createLeaderboard(users);
});

function fillMapLeaderboardSelectBox(){
    let selector = document.querySelector("#mapSelect");
    selector.innerHTML = "";
    for (var mapName in maps){
        let optionBalise = document.createElement("option");
        optionBalise.value = mapName;
        optionBalise.textContent = maps[mapName]["name"];
        selector.appendChild(optionBalise);
    }
}

function getMapByName(name) {
    for (let map_id in maps) {
        if (maps[map_id].name === name) {
            return map_id;
        }
    }
    return null; // Return null if map name not found
}

function convertTimeToSeconds(time) {
    const parts = time.split(':');
    const secondsParts = parts[2].split('.');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(secondsParts[0], 10);
    const milliseconds = secondsParts[1] ? parseInt(secondsParts[1], 10) : 0;
    return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
}