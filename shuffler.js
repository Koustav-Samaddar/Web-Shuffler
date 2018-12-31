/**
 * Returns an array with the shuffled contents of `a`
 * @param {string[]} a - an array of single characters
 * @returns {string[]}
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}