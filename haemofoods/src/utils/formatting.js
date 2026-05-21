//formats iron content with units, rounded to one decimal place
export function formatIron(value) {
    if (value == null) return 'No data'
    return `${value.toFixed(1)} mg/100g`
}

//formats vitamin C content with units, rounded to one decimal place
export function formatVitaminC(value) {
    if (value == null) return 'No data'
    return `${value.toFixed(1)} mg/100g`
}

//formats alcohol content as a percentage, rounded to one decimal place
export function formatAlcohol(value) {
    if (value == null) return 'No data'
    return `${value.toFixed(1)}%`
}

