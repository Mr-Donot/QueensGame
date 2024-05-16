import json
from random import randint, sample




def generate_map(case_number: int, name=None)-> dict:
    if name is None:
        num_rand = randint(0,999999)
        name = "random-" + "0"*(6-len(str(num_rand))) + str(num_rand)
    new_map = {
    "name":name,
    "caseNumber":case_number,
    "colorGrid":[],
    }
    print(name)
    #1- create "winning" map with 0(empty) and 1(queens) (dict : key=row, value=col)
    queens_coord = {}
    col_order = []
    for i in range(case_number):
        col_order.append(i)

    is_col_order_good = False
    while not is_col_order_good:
        col_order = sample(col_order,len(col_order))
        is_col_order_good = True
        for i in range(case_number-1):
            if abs(col_order[i]-col_order[i+1]) <= 2:
                is_col_order_good = False
                break

    for i in range(case_number):
        queens_coord[i] = col_order[i]

    #2- create color map full of -1 exist for each queens
    color_grid = []
    for i in range(case_number):
        temp_row = []
        for j in range(case_number):
            if queens_coord[i] == j:
                temp_row.append(i)
            else:
                temp_row.append(-1)
        color_grid.append(temp_row)
    
    #3- while there is at least one -1, "spread" random color
        # "spread" : find randomly a colored case that has a -1 neighbor, and change -1 to the found color
    while is_elem_in_2D_array(-1, color_grid):
        color = -1
        #find colored case
        while color == -1:
            rand_row = randint(0, case_number - 1)
            rand_col = randint(0, case_number - 1)
            color = color_grid[rand_row][rand_col]

        neighborhood = []
        if rand_row > 0 : neighborhood.append([rand_row - 1, rand_col])
        if rand_row < case_number - 1 : neighborhood.append([rand_row + 1, rand_col])
        if rand_col > 0 : neighborhood.append([rand_row, rand_col - 1])
        if rand_col < case_number - 1 : neighborhood.append([rand_row, rand_col + 1])
        
        uncolored_neigborhood = [neighbor for neighbor in neighborhood if color_grid[neighbor[0]][neighbor[1]]==-1]
        
        if uncolored_neigborhood != []:
            chosen_neighbor = uncolored_neigborhood[randint(0, len(uncolored_neigborhood))-1]
            color_grid[chosen_neighbor[0]][chosen_neighbor[1]] = color

    new_map["colorGrid"] = color_grid

    return new_map

def is_elem_in_2D_array(elem, arr):
    for i in range(len(arr)):
        for j in range(len(arr[i])):
            if arr[i][j] == elem:
                return True
    return False



fichier_json = 'generated_maps/maps.json'

try:
    with open(fichier_json, 'r') as json_file:
        data = json.load(json_file)
except FileNotFoundError:
    data = {}
    with open(fichier_json, 'w') as json_file:
        json.dump(data, json_file)

for i in range(10):
    new_map = generate_map(8)
    data["map"+str(len(data.keys())+1)] = new_map

with open('generated_maps/maps.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4)


def json_to_js(json_file, js_file):
    with open(json_file, 'r') as f:
        data = json.load(f)

    with open(js_file, 'w') as f:
        f.write(f"const maps = {json.dumps(data, indent=4)};")

# Replace 'input.json' with the path to your JSON file
json_file = 'generated_maps/maps.json'
# Replace 'output.js' with the desired name/path for your JavaScript file
js_file = 'script/maps.js'

json_to_js(json_file, js_file)