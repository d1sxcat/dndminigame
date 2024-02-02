import { useContext, useRef, useEffect, useCallback } from "react"
import { GameDataContext } from "../providers/GameContextProvider"
import type { TGameEvent } from "../types/types"

export function useGameContext() {
  const gameDataContext = useContext(GameDataContext)
  if (!gameDataContext) {
    throw new Error("useGameDataContext must be inside a GameDataProvider")
  }
  const portRef = useRef<MessagePort | null>(null)
  const { gameData, setGameData } = gameDataContext

  const onMessage = useCallback((e: MessageEvent<TGameEvent>) => {
    if (
      Object.prototype.hasOwnProperty.call(e.data, "type") &&
      Object.prototype.hasOwnProperty.call(e.data, "message")
    ) {
      setGameData(e.data.message)
    }
  },[setGameData])

  const postScore = (answer: boolean) => {
    if (portRef.current) {
      portRef.current.postMessage({
        type: answer ? "add" : "minus",
        message: 100,
      })
    }
  }
  const postEnd = () => {
    if (portRef.current) {
      portRef.current.postMessage({ type: "finish", message: "now" })
    }
  }

  useEffect(() => {
    if(portRef.current) return
    //I hate doing this but it's the only way to ensure the postMessage is sent after the storyline script has ran.. Must be a better way...
    const x = setInterval(() => {
      parent.postMessage({ type: "loaded", message: "hasLoaded" }, "*")
    }, 100)

    const initPort = (e: MessageEvent) => {
      if (e.data.source && e.data.source.includes("react-devtools")) {
        return
      } else if (e.data && e.data === "init") {
        clearInterval(x)
        portRef.current = e.ports[0]
        portRef.current.onmessage = onMessage
        portRef.current.postMessage({ type: "init", message: "ready" })
      }
    }

    window.addEventListener("message", initPort)

    return () => {
      window.removeEventListener("message", initPort)
      clearInterval(x)
    }
  }, [onMessage])

  return {
    gameData,
    setGameData,
    postScore,
    postEnd,
  }
}
