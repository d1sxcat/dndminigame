import { useRef, useState, useEffect } from "react"
import Draggable, { DraggableEvent, DraggableData } from "react-draggable"
import { TDragData, TPostion } from "../types/types"
import { useAnimationFrame } from "../hooks/useInterval"
import { useWindowResize } from "../hooks/useWindowResize"
import Lottie from "react-lottie-player"
import lottieJson from "../assets/lottie.json"

export default function DraggableDiv({
  text,
  width,
  height,
  correctDirection,
  index,
  setDirectionOfDraggingDiv,
  setRound,
  img,
  fontSize,
  fontColour,
  backgroundColour,
  border,
  borderColour = "black",
  borderWidth = 2,
  handleScore,
}: TDragData & {
  index: number
  setDirectionOfDraggingDiv: React.Dispatch<React.SetStateAction<string | null>>
  setRound: (index: number) => void
  handleScore: (win: number) => void
}) {
  const draggableRef = useRef<HTMLDivElement>(null)
  const windowSize = useWindowResize()
  const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false)
  const [position, setPosition] = useState<TPostion>({
    x: windowSize.windowWidth / 2 - width / 2,
    y: 0,
  })
  const [divPosition, setDivPosition] = useState<TPostion>({
    x: position.x,
    y: position.y,
  })
  const widthOffset = windowSize.windowWidth / 2 - width / 2
  const directionDistance = width / 2
  const [directionofDiv, setDirectionOfDiv] = useState<string | null>(null)
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [hasCalledNextRound, setHasCalledNextRound] = useState<boolean>(false)

  const whichDirection = (x: number): string | null => {
    if (x < widthOffset - directionDistance) return "left"
    else if (x > widthOffset + directionDistance) return "right"
    return null
  }

  const dragging = (_e: DraggableEvent, data: DraggableData) => {
    const direction: string | null = whichDirection(data.x)
    if (direction !== directionofDiv) {
      setDirectionOfDiv(direction)
      setDirectionOfDraggingDiv(direction)
    }
  }

  function stopping(_e: DraggableEvent, data: DraggableData) {
    if (!directionofDiv) {
      setIsBeingDragged(false)
      setDivPosition(position)
      return
    } else {
      setDivPosition({ x: data.x, y: data.y })
      setDirectionOfDraggingDiv(null)
      if (!isFinished) {
        if (directionofDiv === correctDirection) {
          handleScore(1)
        } else {
          handleScore(0)
        }
      }
      setIsFinished(true)
      setTimeout(() => {
        setRound(index)
        setHasCalledNextRound(true)
      }, 200)
    }
  }

  useAnimationFrame(
    (deltaTime:number) => {
      setPosition((prev) => {
        return { ...prev, y: (prev.y + deltaTime) }
      })
    }
    ,!isFinished ? 400 : null
    ,20
  )

  useEffect(() => {
    if (!isBeingDragged) {
      setDivPosition(position)
    }
  }, [position, isBeingDragged])

  useEffect(() => {
    if (position.y >= windowSize.windowHeight * 0.8) {
      if (!hasCalledNextRound) {
        setRound(index)
        setHasCalledNextRound(true)
      }
    }
    if (position.y >= windowSize.windowHeight - height / 2) {
      if (!isFinished) {
        handleScore(2)
      }
      setIsFinished(true)
    }
  }, [position.y, setRound, height, index, windowSize.windowHeight, hasCalledNextRound, handleScore, isFinished])

  useEffect(() => {
    setPosition((prev) => {
      return { ...prev, x: windowSize.windowWidth / 2 - width / 2 }
    })
  }, [windowSize.windowWidth, width])

  return (
    <>
      <Draggable
        nodeRef={draggableRef}
        bounds="parent"
        position={divPosition}
        onStop={(e, data) => {
          stopping(e, data)
        }}
        onDrag={(e, data) => dragging(e, data)}
        onStart={() => {
          setIsBeingDragged(true)
        }}
        disabled={isFinished}
      >
        <div
          className={`absolute flex justify-center items-center z-10 font-Poppins`}
          ref={draggableRef}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <div
            style={{
              backgroundColor: backgroundColour,
              border: `${border ? borderWidth + "px solid " + borderColour : "none"}`,
            }}
            className={`w-full h-full flex flex-col relative justify-center items-center text-center text-xl rounded-xl p-2 cursor-pointer ${
              isFinished ? "transition-all scale-0 opacity-50" : "scale-100"
            }`}
          >
            {img ? (
              <div style={{ backgroundImage: `url(${img})` }} className=" bg-cover bg-center h-full w-full"></div>
            ) : (
              <></>
            )}
            <p style={{ color: fontColour, fontSize: fontSize }}>{text}</p>
          </div>
        </div>
      </Draggable>
      {isFinished ? (
        <Lottie
          animationData={lottieJson}
          play={isFinished}
          style={{ width: width, height: height, backgroundColour:'transparent', transform: `translate(${divPosition.x}px, ${divPosition.y}px)` }}
          loop={false}
          className={`absolute -z-10`}
        />
      ) : (
        <></>
      )}
      <div
        className={`bg-transparent text-transparent absolute flex justify-center items-center font-Poppins text-center text-xl rounded-lg border-4 border-dashed p-2 ${
          isBeingDragged && !isFinished ? "flex" : "hidden"
        }`}
        style={{
          transform: `translate(${widthOffset}px, ${position.y}px)`,
          width: `${width}px`,
          height: `${height}px`,
          border: `4px dashed ${borderColour}`,
        }}
      >
        <p>{text}</p>
      </div>
    </>
  )
}
