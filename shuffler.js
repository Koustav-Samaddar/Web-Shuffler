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

/**
 * Returns a copy of `text` but with all the words' mid-section shuffled
 * @param {string} text - a string containing text to be "shuffled"
 * @returns {string}
 */
function shuffleAllWords(text) {
	for (let i = 0; i < text.length; ++i) {
		// Get to the start of a word
		while (i < text.length && text.charAt(i).match(/\W/)) {
			++i
		}
	
		if (i == text.length) {
			break
		}
	
		// At start of word, now find end
		let j = i + 1
		while (j < text.length && text.charAt(j).match(/\w/)) {
			++j
		}	
	
		// console.log('i: ' + i, 'j: ' + j)
		// Now i, j are bounds, change to mid-bounds
		++i
		--j
	
		// Shuffle mid-section of word
		if (i < j) {
			const midArr = text.substring(i, j).split("")
			const newMid = shuffle(midArr).join("")

			text = text.slice(0, i) + newMid + text.slice(j)
		}

		i = j
	}

	return text
}

// The main body of the extension
Array.prototype.forEach.call(
	document.querySelectorAll('p,h1,h2,h3,h4,h5,h6,a,label,span,div'), element => {
		if (element.childElementCount == 0) {
			// console.log(shuffleAllWords(element.textContent))
			element.textContent = shuffleAllWords(element.textContent)
		}
	}
)