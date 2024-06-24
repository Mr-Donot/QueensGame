[![pages-build-deployment](https://github.com/Mr-Donot/QueensGame/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/Mr-Donot/QueensGame/actions/workflows/pages/pages-build-deployment)

# QueensGame

homemade game inspired by linkedin game : **Queens**
see more here : https://www.linkedin.com/games/queens/

### Example of the project
![Example of the project](img/readme_1.png)

# How to play

## Online
here : https://mr-donot.github.io/QueensGame/

##Offline
- download the project
- open index.html
- comment the <script src="verif_auth.js"></script> line in the index.html
- Enjoy the game !

# Generate new maps

- In the "main.py" file, change the value of the constant "NB_TRY_TO_GENERATE" to your desire
- Then, run the main.py" file
- Then, run the "push_to_prod.py" file
- refresh the index.html opened in your browser, the new maps will be added to the scrolling box
