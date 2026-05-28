export function getRelevanceScore(query, name) {
    //lowercase both so matching is case insensitive
    const lowerName = name.toLowerCase()
    const lowerQuery = query.toLowerCase()
  
    //split the query into individual words and remove empty strings
    //e.g. "chicken breast" becomes ['chicken', 'breast']
    const queryWords = lowerQuery.split(' ').filter(word => word.length > 0)
  
    //split the food name into words too
    //e.g. "Beef Steak — Sirloin (Raw)" becomes ['beef', 'steak', '—', 'sirloin', '(raw)']
    const nameWords = lowerName.split(' ').filter(word => word.length > 0)
  
    //score each query word individually then add them up
    let totalScore = 0
  
    for (const queryWord of queryWords) {
  
      //tier 1 — exact match: the query word IS the entire name
      if (lowerName === queryWord) {
        totalScore += 100
      }
      //tier 2 — name starts with the query word
      else if (lowerName.startsWith(queryWord)) {
        totalScore += 75
      }
      //tier 3 — any word in the name starts with the query word
      //e.g. "steak" matches "Beef Steak" because "steak".startsWith("steak")
      else if (nameWords.some(nameWord => nameWord.startsWith(queryWord))) {
        totalScore += 50
      }
      //tier 4 — query word appears somewhere in the name
      //e.g. "irl" is inside "sirloin"
      else if (lowerName.includes(queryWord)) {
        totalScore += 25
      }
      //no match — this word adds nothing
    }
  
    return totalScore
  }