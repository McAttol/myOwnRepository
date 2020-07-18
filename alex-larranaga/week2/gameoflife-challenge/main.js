const container = document.getElementById('container')

const makeDivsAlivefunction = function () {
	cell.style.backgroundColor = 'red'
	let divArray = Array.from(document.getElementsByClassName('grid-item'))
	console.log(divArray)
}

const drawBoard = function (rows, cols) {
	container.style.setProperty('--grid-rows', rows)
	container.style.setProperty('--grid-cols', cols)
	for (c = 0; c < rows * cols; c++) {
		let cell = document.createElement('div')
		cell.addEventListener(
			'click',
			(returnBoard = function () {
				cell.style.backgroundColor = 'red'
				let divArray = Array.from(document.getElementsByClassName('grid-item'))
				console.log(divArray)
				deconstructedArray = []
				cell.classList.add('true')
				for (let i = 0; i < divArray.length; i++) {
                    deconstructedArray.push(divArray[i].className)
                    console.log(deconstructedArray[i])
				}
				return divArray
			})
		)
		cell.innerText = c + 1
		container.appendChild(cell).className = 'grid-item'
	}
}
let submitButton = document.getElementById('createButton')
submitButton.addEventListener('submit', drawBoard(10, 10))

const game = {
	createBoard: function (row, cell) {
		let gameBoard = []
		let rowCells = []
		for (let j = 0; j <= cell; j++) {
			rowCells.push(0)
		}
		for (let i = 0; i <= row; i++) {
			gameBoard.push(rowCells)
		}
		return gameBoard
	},
}

function chunk(arr) {
	let boardMutatedArray = []
	while (arr.length > 0) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] === 'div#true.grid-item') {
				boardMutatedArray[i].push(1)
			} else {
				boardMutatedArray[i].push(0)
			}
		}
		chunk = boardMutatedArray.splice(0, 10)

		console.log(chunk)
	}
}
function mutateArray() {}

console.log(element)
