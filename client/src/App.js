import { useCallback, useEffect, useState} from 'react'

const width = 8
const candyColors = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
]

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([])

  const checkForColumnOfThree= useCallback(() => {
    for (let i =0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width *2]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === ''
      if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)){
        columnOfThree.forEach(square => currentColorArrangement[square] = '')
        return true
      }
    }
  }, [currentColorArrangement])

  const checkForColumnOfFour = useCallback(() => {
    for (let i=0; i<=39; i++) {
      const columnOfFour = [i, i+width, i+width*2, i+width*3]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === ''
      if(columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)){
        columnOfFour.forEach(square => currentColorArrangement[square] = '')
        return true
      }
    }
  }, [currentColorArrangement])

  const checkForRowOfThree= useCallback(() => {
    for (let i =0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArrangement[i]
      const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
      const isBlank = currentColorArrangement[i] === ''
      if(notValid.includes(i)) continue
      if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)){
        rowOfThree.forEach(square => currentColorArrangement[square] = '')
        return true
      }
    }
  }, [currentColorArrangement])

  const checkForRowOfFour= useCallback(() => {
    for (let i =0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i+3]
      const decidedColor = currentColorArrangement[i]
      const notValid = [5, 6,7,13,14,15,21, 22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
      const isBlank = currentColorArrangement[i] === ''
      if(notValid.includes(i)) continue
      if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)){
        rowOfFour.forEach(square => currentColorArrangement[square] = '')
        return true
      }
    }
  }, [currentColorArrangement])

  const moveIntoSquareBelow = useCallback(() => {
    for (let i =0; i <= 55; i++) {
      const firstRow = [0,1,2,3,4,5,6,7]
      const isFirstRow = firstRow.includes(i)
      if (isFirstRow && currentColorArrangement[i] === '') {
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArrangement[i] = candyColors[randomNumber]
      }

      if ((currentColorArrangement[i + width]) === ''){
        currentColorArrangement[i + width] = currentColorArrangement[i]
        currentColorArrangement[i] = ''
      }
    }
  }, [currentColorArrangement])

const createBoard = () => {
  const randomColorArrangement = []
  for (let i =0; i <width * width; i++) {
    const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
    randomColorArrangement.push(randomColor)
  }
  setCurrentColorArrangement(randomColorArrangement)
}


useEffect(() => {
  createBoard()

}, [])

useEffect(() => {
  const timer = setInterval(() => {
    checkForColumnOfFour()
    checkForColumnOfThree()
    checkForRowOfFour()
    checkForRowOfThree()
    moveIntoSquareBelow()
    setCurrentColorArrangement([...currentColorArrangement])
  }, 1000)
  return () => clearInterval(timer)

}, [checkForColumnOfFour, checkForColumnOfThree,checkForRowOfFour, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])

return (
    <div className="app">
      <div className = "game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            style={{backgroundColor: candyColor}}
            alt={candyColor}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
