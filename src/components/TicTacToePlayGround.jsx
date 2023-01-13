import React, { useEffect, useState } from 'react'
import Cross from "../assets/music/cross.mp3" 
import Gameover from "../assets/music/gameover.mp3" 

export default function TicTacToePlayGround() {
  const cross = new Audio(Cross)
  const [board, setBoard] = useState([])
  const [who, setWho] = useState(0)
  const [winTypes] = useState([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ])

  function updateBoard(id) {
    const newBoard = board.map((obj) => {
      if(obj.id === id){
        return {
          ...obj,
          check: 1,
          who: who
        }
      } else {
        return obj
      }
    })
    
    setBoard(newBoard)
  }

  function handleOnClick(id) {
    if(board[id]?.check === 0){
      const e = document.getElementsByClassName(id)
    
      e[0].classList.forEach((c) => {
        if(c === 'hover-cross'){
          e[0].classList?.remove('hover-cross')
        }
        if(c === 'hover-check'){
          e[0].classList?.remove('hover-check')
        }
      })

      if(who === 0){
        e[0].classList?.add('cross')
      } else {
        e[0].classList?.add('check')
      }

      updateBoard(id)

      if(who){
        cross.play()
        setWho(0)
      } else {
        cross.play()
        setWho(1)
      }
    }
  }

  function handleMouseEnter(id) {
    if(board[id]?.check === 0){
      const e = document.getElementsByClassName(id)
      
      if(who === 0){
        e[0].classList?.add('hover-cross')
      } else {
        e[0].classList?.add('hover-check')
      }
    }
  }
 
  function handleMouseLeave(id) {
    if(board[id].check === 0){
      const e = document.getElementsByClassName(id)
  
      if(e[0].classList.contains('hover-cross')){
        e[0].classList?.remove('hover-cross')
      } else {
        e[0].classList?.remove('hover-check')
      }
    }
  }

  useEffect(() => {
    const gameover = new Audio(Gameover)

    function checkWin() {
      for(let i = 0; i < winTypes.length; i++){
        if(board[winTypes[i][0]]?.check === 1 && board[winTypes[i][1]]?.check === 1 && board[winTypes[i][2]]?.check === 1){
          if((board[winTypes[i][0]]?.who === 0 && board[winTypes[i][1]]?.who === 0 && board[winTypes[i][2]]?.who === 0 ) || 
            (board[winTypes[i][0]]?.who === 1 && board[winTypes[i][1]]?.who === 1 && board[winTypes[i][2]]?.who === 1)){
            gameover.play()
            for(let j = 0; j < winTypes[i].length; j++){
              const e = document.getElementsByClassName(winTypes[i][j])
              e[0].classList?.add('win')
            }
  
            for(let j = 0; j < 9; j++){
              const e = document.getElementsByClassName(j)
              if(e[0].classList?.contains('win')){
                continue
              } else {
                e[0].classList?.add('loss')
                board[j].check = 1
              }
            }
  
            return true
          }
        }
      }
  
      return false
    }

    checkWin()
  }, [board, winTypes])
 
  useEffect(() => {
    let temp = [], n = 9, i = 0;

    while(n--){
      temp.push({
        id: i++,
        check: 0,
        who: -1
      })
    }

    setBoard(temp)
  }, [])

  return (
    <div className='body'>
      <div className="board">
        <div className='br bb 0' onClick={() => handleOnClick(0)} onMouseEnter={() => handleMouseEnter(0)} onMouseLeave={() => handleMouseLeave(0)}></div>
        <div className='bl br bb 1' onClick={() => handleOnClick(1)} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={() => handleMouseLeave(1)}></div>
        <div className='bl bb 2' onClick={() => handleOnClick(2)} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={() => handleMouseLeave(2)}></div>
        <div className='bt br bb 3' onClick={() => handleOnClick(3)} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={() => handleMouseLeave(3)}></div>
        <div className='bl bt br bb 4' onClick={() => handleOnClick(4)} onMouseEnter={() => handleMouseEnter(4)} onMouseLeave={() => handleMouseLeave(4)}></div>
        <div className='bl bt bb 5' onClick={() => handleOnClick(5)} onMouseEnter={() => handleMouseEnter(5)} onMouseLeave={() => handleMouseLeave(5)}></div>
        <div className='bt br 6' onClick={() => handleOnClick(6)} onMouseEnter={() => handleMouseEnter(6)} onMouseLeave={() => handleMouseLeave(6)}></div>
        <div className='bl bt br 7' onClick={() => handleOnClick(7)} onMouseEnter={() => handleMouseEnter(7)} onMouseLeave={() => handleMouseLeave(7)}></div>
        <div className='bl bt 8' onClick={() => handleOnClick(8)} onMouseEnter={() => handleMouseEnter(8)} onMouseLeave={() => handleMouseLeave(8)}></div>
      </div>
    </div>
  )
}