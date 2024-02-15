import { Fragment, useState, useEffect } from "react"
import { useGameContext } from "../hooks/useGameContext"
import DraggableDiv from "./DraggingDiv"
import PlayArea from "./PlayArea"

export default function GameManager() {
  const { gameData, postScore, postEnd, postBin } = useGameContext()
  const [directionOfDraggingDiv, setDirectionOfDraggingDiv] = useState<string | null>(null)
  const [round, setRound] = useState<number>(0)

  const handleRoundChange = (index: number) => {
    if (!gameData) return
    setRound((prev) => (prev <= index ? prev + 1 : prev))
  }

  const handleScore = (won: number) => {
    if(won < 2) {
      const bool:boolean = won === 0 ? false : true
      postScore(bool)
      return
    }
    postBin()
  }

  useEffect(() => {
    if(!gameData) return
    if (round === gameData.Divs.length){
        setTimeout(() => {
            postEnd()
        },200)
    }
  },[round, gameData, postEnd])

  return (
    <>
      {gameData ? (
        <PlayArea
          PlayAreaDataLeft={gameData.PlayAreaData.PlayAreaDataLeft}
          PlayAreaDataRight={gameData.PlayAreaData.PlayAreaDataRight}
          directionOfDiv={directionOfDraggingDiv}
        >
          {gameData.Divs.map((val, index) => (
            <Fragment key={val.text}>
              {round >= index ? (
                <DraggableDiv
                  text={val.text}
                  width={val.width}
                  height={val.height}
                  correctDirection={val.correctDirection}
                  index={index}
                  setDirectionOfDraggingDiv={setDirectionOfDraggingDiv}
                  setRound={handleRoundChange}
                  fontColour={val.fontColour}
                  fontSize={val.fontSize}
                  img={val.img}
                  backgroundColour={val.backgroundColour}
                  border={val.border}
                  borderColour={val.borderColour}
                  borderWidth={val.borderWidth}
                  handleScore={handleScore}
                />
              ) : (
                <></>
              )}
            </Fragment>
          ))}
        </PlayArea>
      ) : (
        <></>
      )}
    </>
  )
}
