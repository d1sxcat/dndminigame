import { createContext, useState, PropsWithChildren } from 'react'
import { TGameData } from '../types/types'

type GameProvider = {
    gameData:TGameData | null
    setGameData: React.Dispatch<React.SetStateAction<TGameData | null>>
}

export const GameDataContext = createContext<GameProvider | null>(null)

export const GameDataProvider:React.FC<PropsWithChildren> = ({
    children
  }) => {

    const [gameData, setGameData] = useState<TGameData | null>(null)
    
    return (
      <GameDataContext.Provider value={{gameData, setGameData}}>
        {children}
      </GameDataContext.Provider>
    )
  }