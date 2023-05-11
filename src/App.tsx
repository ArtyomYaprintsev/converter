import { SetStateAction, useRef, useState } from "react";
import "./App.css";
import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
  JSONSchemaInput,
  FetchingJSONSchemaStore
} from "quicktype-core";

async function quicktypeJSON(targetLanguage: string, typeName: string, jsonString:string) {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);

  // We could add multiple samples for the same desired
  // type, or many sources for other types. Here we're
  // just making one type from one piece of sample JSON.
  
  await jsonInput.addSource({
      name: typeName,
      samples: [jsonString]
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  return await quicktype({
      inputData,
      lang: targetLanguage
  });
}


function App() {
  const ts = 'TypeScript';

  //const [input_area, setInput] = useState('')

  const ref = useRef(null);

  /*const submitForm = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();}*/

  const Convert = (event: any) =>{
    event.preventDefault()
    console.log(ref.current.value)
    let output = quicktypeJSON(ts, 'name', ref.current.value)
      .then(result => {console.log(result.lines)})
      .catch(err => alert(err))
  }

  return (
    <div className="App">
      <header>
        <div>
          <h1>Конвертер</h1>
        </div>
      </header>
      <main>
        <div className="Input Column">
          <div>
            <span className="Text">из</span>
            <select id="types">
              <option value="JSON" selected>
                JSON
              </option>
              <option value="Another">Another</option>
            </select>
          </div>
          <textarea name="in" id="in" cols="30" rows="30" autoComplete="on" autoFocus ref={ref}/>
        </div>
        <div className="Output Column">
          <div><span className="Text">в</span>
            <select id="types">
              <option value="JSON" selected>
                JSON
              </option>
              <option value="Another">Another</option>
            </select>
            <button>Скачать</button><button>Скопировать</button>
            <textarea name="out" id="output" cols="30" rows="30" autoComplete="on" readOnly/>
          </div>
        </div>
        <div className="Params Column">Параметры конвертации</div>
      </main>
      <footer>
        <button className="Convert Button Inactive" onClick={Convert}>Конвертировать</button>
        <button className="Apply Button">Применить</button>
      </footer>
    </div>
  );
}

export default App;
