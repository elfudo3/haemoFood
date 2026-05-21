export function getIronRating(ironPer100g){
    if (ironPer100g === null || ironPer100g === undefined){
        return 'unknown'
    } else if(ironPer100g <= 1.4){
        return 'safe';
    } else if (ironPer100g > 1.4 && ironPer100g <= 3.5){
        return 'moderate';
    } else {
        return 'avoid';
    } 
}