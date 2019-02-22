/**
 * Parses a string of HTML code
 * @param {string} text - a string of HTML code
 * @returns {string[]}
 */
function separateInnerHTML(text) {
	const textParts = []
	let i = 0

	while (i < text.length) {
		const old_i = i

		while (i < text.length && text.charAt(i) !== '<') {
			++i
		}

		// Text not encapsulated in an inner tag
		textParts.push({ value: text.substring(old_i, i), fixed: false })

		let j = i + 1

		while (j < text.length && text.charAt(j) !== '>') {
			++j
		}

		// Check if self closing tag or not
		if (text.charAt(j - 1) === '/') {
			textParts.push({ value: text.substring(i, j + 1), fixed: true, enclosed: true })
		} else {
			const tagName = text.substring(i, j + 1).replace(/<\s*([A-Za-z])+\s*.+/, '$1')
			const isEnd = text.charAt(i + 1) === '/'
			textParts.push({ value: text.substring(i, j + 1), fixed: true, enclosed: false, start: !isEnd })
		}

		i = j + 1
	}

	if (textParts[textParts.length - 1]['value'] === '') {
		textParts.pop()
	}

	return textParts
}

/**
 * Returns indices of the array that can be modified
 * @param {string[]} textArr - array of strings of HTML code
 * @returns {int[]}
 */
function getEditableHTML(textArr) {
	const editableIndices = []
	let openTags = 0

	for (let i = 0; i < textArr.length; ++i) {
		if (!textArr[i]['fixed']) {
			if (openTags === 0) {
				editableIndices.push(i)
			}
		} else {
			if (!textArr[i]['enclosed']) {
				if (textArr[i]['start']) {
					++openTags
				} else {
					--openTags
				}
			}
		}
	}

	return editableIndices
}

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
		while (i < text.length && text.charAt(i).match(/[^a-zA-Z]/)) {
			++i
		}
	
		if (i == text.length) {
			break
		}
	
		// At start of word, now find end
		let j = i + 1
		while (j < text.length && text.charAt(j).match(/[a-zA-Z]/)) {
			++j
		}
	
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
// Array.prototype.forEach.call(
// 	document.querySelectorAll('p,h1,h2,h3,h4,h5,h6,a,label,span,div'), element => {
// 		if (element.childElementCount == 0) {
// 			element.innerHTML = shuffleAllWords(element.innerHTML)
// 		}
// 	}
// )

const text = "Hello <span> My </span> my name is <em> Koustav </em> Raj <input /> Samaddar"
console.log(separateInnerHTML(text))
console.log(getEditableHTML(separateInnerHTML(text)))