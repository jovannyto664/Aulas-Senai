function melhorPt(functionn) {
    let best = functionn[0]
    for (let i = 0; i < functionn.length; i++) {
        best = Math.max(best, functionn[i])
    }
    return best
}
let pt = [85, 12, 45, 150, 22]
console.log(melhorPt(pt))