import { useRef } from 'react'
import Draggable from 'react-draggable'
import PlayArea from './components/PlayArea'
import './App.css'

function App() {

  const ref = useRef<HTMLDivElement>(null)
  return (
    <>
    <PlayArea >
    <Draggable nodeRef={ref}>
      <div className='text-slate-800 absolute' ref={ref}>Poop</div>
    </Draggable>
    </PlayArea>
    </>
  )
}

export default App
