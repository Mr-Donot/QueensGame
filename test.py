def are_grids_same(g1, g2):

    if len(g1) != len(g2):
        return False
    d1 = {}
    d2 = {}

    for i in range(len(g1)):
        for j in range(len(g1)):
            v1 = g1[i][j]
            v2 = g2[i][j]
            if v1 not in d1:
                d1[v1] = [[i,j]]
            else:
                d1[v1].append([i,j])
            if v2 not in d2:
                d2[v2] = [[i,j]]
            else:
                d2[v2].append([i,j])

    a1 = []
    a2 = []
    for k1, k2 in zip(d1, d2):
        a1.append(d1[k1])
        a2.append(d2[k2])
    
    a1.sort()
    a2.sort()
    
    return a1 == a2

# Exemple d'utilisation :
g1 = [[1, 1, 7], [1, 7, 7], [2, 2, 7]]
g2 = [[2, 2, 0], [2, 0, 0], [1, 1, 0]]

print(are_grids_same(g1, g2))