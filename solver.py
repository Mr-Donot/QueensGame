def generate_positions(n):
    def backtrack(position, used):
        if len(position) == n:
            positions.append(position[:])
            return
        for i in range(n):
            if not used[i] and (len(position) < 1 or abs(position[-1] - i) > 1):
                position.append(i)
                used[i] = True
                backtrack(position, used)
                position.pop()
                used[i] = False

    positions = []
    backtrack([], [False] * n)
    return positions

def solve(queen_map, name):
    grid = queen_map
    blocks = fill_blocks(grid)
    all_pos = generate_positions(len(grid))
    result = {
        "name":name,
        "solvable":False,
        "number_solution":0,
        "number_possibility":len(all_pos)
    }
    positions  = [0] * len(grid)

    for i in range(len(all_pos)):
        positions = all_pos[i]
        game_state = []
        for j in range(len(grid)):
            temp_line = [0]*len(grid)
            game_state.append(temp_line)
        for pos in range(len(positions)):
            game_state[pos][positions[pos]] = 1

        if check_win(game_state, blocks):
            result['solvable'] = True
            result['number_solution'] += 1

    return result

def increment_positions(arr):
    n = len(arr)
    i = n - 1
    while i >= 0:
        if arr[i] < n - 1:
            arr[i] += 1
            break
        else:
            arr[i] = 0
            i -= 1
    return arr


def check_win(game_state, blocks):
    # Check rows and columns
    for i in range(len(game_state)):
        copied_array = game_state[i][:]
        sum_row = sum(copied_array)
        if sum_row != 1:
            return False
        
        sum_col = 0
        for j in range(len(game_state[i])):
            sum_col += game_state[j][i]
        
        if sum_col != 1:
            return False
    
    # Check diagonals
    for i in range(1, len(game_state) - 1):
        for j in range(1, len(game_state) - 1):
            val_center = game_state[i][j]
            if val_center == 1:
                if game_state[i-1][j-1] == 1:
                    return False
                if game_state[i-1][j+1] == 1:
                    return False
                if game_state[i+1][j-1] == 1:
                    return False
                if game_state[i+1][j+1] == 1:
                    return False
    
    for key in blocks:
        sum_block = 0
        for coord in blocks[key]:
            sum_block += game_state[coord[0]][coord[1]]
        if sum_block > 1:
            return False
    
    return True

def fill_blocks(color_grid):
    blocks = {}
    for i in range(len(color_grid)):
        for j in range(len(color_grid[i])):
            color = str(color_grid[i][j])
            if color in blocks:
                blocks[color].append([i, j])
            else:
                blocks[color] = [[i, j]]
    return blocks
