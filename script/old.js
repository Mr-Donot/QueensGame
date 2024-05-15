function oldCheckDiagonals(){
    let i;
    let j;
    for (i = 0 ; i < gameState.length -1 ; i++){
        let sumDiagRowNWtoSE = 0;
        let sumDiagColNWtoSE = 0;
        
        let sumDiagRowSEtoNW = 0;
        let sumDiagColSEtoNW = 0;

        for (j = 0 ; j < gameState.length - i ; j++){
            sumDiagRowNWtoSE += gameState[j][j+i];
            sumDiagColNWtoSE += gameState[j+i][j];

            sumDiagRowSEtoNW += gameState[j][gameState.length -1 - i - j];
            sumDiagColSEtoNW += gameState[j+i][gameState.length -1 - j];
        }
        if (sumDiagRowNWtoSE > 1){
            console.log("loose NWtoSE row", sumDiagRowNWtoSE, i, j);
            return false;
        }
        if (sumDiagColNWtoSE > 1){
            console.log("loose NWtoSE col", sumDiagColNWtoSE, i, j);
            return false;
        }
        if (sumDiagRowSEtoNW > 1){
            console.log("loose SEtoNW row", sumDiagRowSEtoNW, i, j);
            return false;
        }
        if (sumDiagColSEtoNW > 1){
            console.log("loose SEtoNW col", sumDiagColSEtoNW    , i, j);
            return false;
        }
    }
    return true;
}