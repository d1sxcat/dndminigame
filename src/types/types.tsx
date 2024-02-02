export type TDragData = {
    text:string
    width:number
    height:number
    correctDirection:string
    img?: string
    fontSize: number
    backgroundColour: string
    fontColour: string
    border:boolean
    borderColour?:string
    borderWidth?:number
}

export type TPlaySide = {
    width:number
    height:number
    text:string
    img?:string
    fontSize:number
    fontColour:string
    border:boolean
    borderColour?:string
    borderWidth?:number
    backgroundColour:string
}

export type TPlayArea = {
    PlayAreaDataLeft:TPlaySide
    PlayAreaDataRight:TPlaySide
}

export type TGameData = {
    PlayAreaData:TPlayArea
    Divs:TDragData[]
}

export type TGameEvent = {
    type: string
    message: TGameData
  }

  export type TPostion = {
    x:number
    y:number
  }