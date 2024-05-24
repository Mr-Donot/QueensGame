import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

async function getUsersMapCount() {
    const db = getDatabase();
    const usersRef = ref(db, 'users/');

    try {
        // Récupérer les utilisateurs et leurs cartes
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
            const usersData = snapshot.val();
            const userMapCounts = {};

            // Parcourir tous les utilisateurs et compter leurs cartes
            Object.keys(usersData).forEach(userID => {
                const username = usersData[userID]["name"];
                const maps = usersData[userID]["maps"];
                userMapCounts[username] = Object.keys(maps).length;
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

document.addEventListener('DOMContentLoaded', async function() {
    // Example users data - this would be replaced with data from your actual source
    //const users = {"Alice": 120,"Bob": 150,"Charlie": 90,"Daniel": 180,"Eve": 135};

    const users = await getUsersMapCount();

    function createLeaderboard(users) {
        const leaderboardElement = document.getElementById('leaderboard');

        // Sort users by score in descending order
        const sortedUsers = Object.entries(users).sort((a, b) => b[1] - a[1]);

        // Clear any existing content
        leaderboardElement.innerHTML = '';

        // Create the leaderboard entries
        sortedUsers.forEach(([name, score]) => {
            const userDiv = document.createElement('div');
            userDiv.className = 'user';
            userDiv.innerHTML = `<span class="username">${name}</span><span class="score">${score}</span>`;
            leaderboardElement.appendChild(userDiv);
        });
    }

    // Placeholder functions for nav buttons
    document.getElementById('navButton1').addEventListener('click', () => alert('Button 1 clicked!'));
    document.getElementById('navButton2').addEventListener('click', () => alert('Button 2 clicked!'));
    document.getElementById('navButton3').addEventListener('click', () => alert('Button 3 clicked!'));

    // Initial creation of the leaderboard
    createLeaderboard(users);
});
