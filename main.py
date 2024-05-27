import json
from generator import *
from solver import *

#constants
DIC_POSSIBLE_SOLUTION_MAX = {
    5:1,
    6:1,
    7:1,
    8:5,
    9:15,
    10:30
}

NB_TRY_TO_GENERATE = 1000
GRID_LEN = 7
NB_POSSIBLE_SOLUTION_MAX = DIC_POSSIBLE_SOLUTION_MAX[GRID_LEN]

nb_new_added = 0
fichier_json = 'generated_maps/maps.json'

try:
    with open(fichier_json, 'r') as json_file:
        data = json.load(json_file)
except FileNotFoundError:
    data = {}
    with open(fichier_json, 'w') as json_file:
        json.dump(data, json_file)

for i in range(NB_TRY_TO_GENERATE):
    new_map = generate_map(GRID_LEN)
    #testing difficulty
    solution = solve(new_map['colorGrid'], new_map['name'])
    print(i, "|",solution)
    if solution["number_solution"] <= NB_POSSIBLE_SOLUTION_MAX :
        print("New good !")
        is_unique = True
        for key in data:
            if are_grids_same(new_map['colorGrid'], data[key]['colorGrid']):
                is_unique = False
                print("Already exists...")
                break
                
        if is_unique:
            new_map['name'] = "Map n° " + str(len(data.keys())+1)
            data["map"+str(len(data.keys())+1)] = new_map
            nb_new_added += 1


with open('generated_maps/maps.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4)

print(f"{nb_new_added} new maps added !!!")
