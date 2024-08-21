function generateArray(l, h, min, max) {
	const targetArray = []
	for (let ii = 0; ii < h; ii++) {
		const arrayInLine = []
		for (let i = 0; i < l; i++) {
			arrayInLine.push(Math.floor(Math.random() * (max - min) + min))
		}
		targetArray.push(arrayInLine)
	}
	return targetArray
}

function findMinNumberLineIndex(array) {
	const arrayOfMin = array.map((i) => {
		return Math.min(...i)
	})

	const min = Math.min(...arrayOfMin)
	return arrayOfMin.indexOf(min)
}

function findMinPositiveNumbers(array) {
	return array.map((i) => {
		const positives = i.filter((n) => n > 0)
		return Math.min(...positives)
	})
}

function countOfItemsToReplaceInLine(array) {
	const compare = (prev, curr) => {
		if (prev < 0 && curr < 0) return true
		if (prev > 0 && curr > 0) return true
		return false
	}
	return array.map((arr) => {
		let group = 0
		let items = 0
		let previous = 0
		arr.forEach((value, index) => {
			if (index === 0) {
				previous = value
				group++
				return value
			}
			if (compare(previous, value)) {
				group++
			} else {
				if (group >= 3) {
					items += Math.floor(group / 3)
				}
				group = 1
			}
			previous = value
			return value
		})
		return items
	})
}

const array = generateArray(10, 10, -100, 100)

function prepareArrayForConsole(array) {
	const minPositiveArray = findMinPositiveNumbers(array)
	const itemsToReplace = countOfItemsToReplaceInLine(array)
	const minNumberLineIndex = findMinNumberLineIndex(array)
	return array.map((item, index) => {
		item = item.map((item) => {
			if (item === minPositiveArray[index]) {
				item = String(item)
			}

			return item
		})
		item.push({
			minPositive: minPositiveArray[index],
			itemsToReplace: itemsToReplace[index],
		})
		if (index === minNumberLineIndex) {
			item.push("*")
		}
		return item
	})
}

const preparedArrayForTable = prepareArrayForConsole(array)

console.table(preparedArrayForTable)
