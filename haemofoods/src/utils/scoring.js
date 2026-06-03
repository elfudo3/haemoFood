//function for simple iron rating 
export function getIronRating(ironPer100g){
    if (ironPer100g === null || ironPer100g === undefined) return 'unknown'
    if (ironPer100g <= 1.5) return 'safe'
    if (ironPer100g > 1.5 && ironPer100g <= 3.5) return 'moderate'
    return 'avoid'
}
//test passed! - all GREEN

//catergory tags mapped to iron risk level
//all tags confirmed from real Open Food Facts API responses
const CATEGORY_RATINGS = {
    avoid: [
        'en:meats', 'en:meats-and-their-products', 'en:prepared-meats',
        'en:offals',
        'en:pork', 'en:pork-and-its-products',
        'en:seafood', 'en:mollusc', 'en:mussels',
    ],
    moderate: [
        'en:cereals-and-potatoes', 'en:cereals-and-their-products', 'en:breakfast-cereals',
        'en:legumes-and-their-products',
        'en:fishes', 'en:fishes-and-their-products',
    ],
    safe: [
        'en:dairies', 'en:milks', 'en:cheeses',
        'en:fruits-and-vegetables-based-foods', 'en:fruits-based-foods',
        'en:vegetables-based-foods', 'en:fresh-foods',   
    ]
}

//numeric priority so we can pick the worst match
const RATING_PRIORITY = { avoid: 3, moderate: 2, safe: 1, unknown: 0 }


export function getCategoryRating(categoryTags){
    //handle missing or empty category data
    if (!categoryTags || categoryTags.length === 0) return 'unknown'

    //worst tracks the most dangerous rating found 
    let worst = 'unknown'

    //loop through every tag the product has
    for (const tag of categoryTags) {
        //check each tag against our rating map 
        for (const [ rating, tags ] of Object.entries(CATEGORY_RATINGS)) {
            if (tags.includes(tag) && RATING_PRIORITY[rating] > RATING_PRIORITY[worst]) {
                worst = rating
            } 
        }
    }

    return worst
}