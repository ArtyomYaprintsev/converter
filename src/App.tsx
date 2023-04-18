import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">

      <header><div><h1>Конвертер</h1> <img src="" alt="square" /></div></header>
      <div>
      <div className='Convertation'>
        <div className='Input'><div>из <input list='types'/></div><button>Скопировать</button><textarea name="in" id="input" cols="30" rows="10"></textarea></div>
        <div className='Output'><div>в <input list='types'/> <button>Скачать</button><textarea name="out" id="output" cols="30" rows="10"></textarea></div></div>
      </div>

      <div className='Params'>Параметры конвертации</div>
      </div>

      <datalist id='types'>
        <option value="JSON" />
        <option value="Another" />
      </datalist>
    </div>
    
  )
}

export default App
