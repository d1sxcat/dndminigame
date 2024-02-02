import type { TPlayArea, TPlaySide } from "../types/types"

export default function PlayArea({
  PlayAreaDataLeft,
  PlayAreaDataRight,
  directionOfDiv,
  children,
}: TPlayArea & {
  directionOfDiv: string | null
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full w-full">
      <PlayAreaSide side={PlayAreaDataLeft} directionOfDiv={directionOfDiv} direction="left" />
      <div className="h-full w-12"></div>
      <PlayAreaSide side={PlayAreaDataRight} directionOfDiv={directionOfDiv} direction="right" />
      {children}
    </div>
  )
}

function PlayAreaSide({side, directionOfDiv, direction}: {side: TPlaySide, directionOfDiv:string | null, direction:string}){

    return(
        <div className="bg-transparent h-full w-full flex items-center justify-center font-Poppins -z-20">
        <div
          className={`transition-all flex flex-col justify-center items-center ${directionOfDiv === direction ? "scale-125 drop-shadow-lg" : ""}`}
          style={{ 
            width: `${side.width}px`, 
            height: `${side.height}px`, 
            border: `${ side.border&&side.borderWidth&&side.borderColour ? side.borderWidth+'px solid '+side.borderColour : 'none'}`,
            backgroundColor: side.backgroundColour
            }}
        >
            {side.img ? 
            <div style={{backgroundImage:`url(${side.img})`}} className=" bg-cover bg-center h-full w-full"></div> : <></>}
            <p style={{fontSize:side.fontSize, color:side.fontColour}}>{side.text}</p>
        </div>
      </div>
    )
}