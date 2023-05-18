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
        <div className="Logo">
          <div className="Title">Конвертер</div>
          <div className="RedStripe"></div>
        </div>
      </header>
      <main>
        <div className="LeftSide">
          <div className="Content">
            <div className="Input Block">
              <div className="Container">
                <div className="Header">
                  <span className="Text">из</span>
                  <select id="FromTypes">
                    <option value="JSON" selected>
                      JSON
                    </option>
                    <option value="Another">
                      Another
                    </option>
                  </select>
                </div>
                <div className="Body">
                  <textarea className="TextArea" name="in" id="in" autoComplete="on" autoFocus ref={ref}/>
                </div>
              </div>
            </div>
            <div className="BetweenStripe">
              <div className="FirstStripe"></div>
              <div className="Arrow"></div>
              <div className="SecondStripe"></div>
            </div>
            <div className="Output Block">
              <div className="Container">
                <div className="Header">
                  <span className="Text">в</span>
                  <select id="ToTypes">
                    <option value="JSON" selected>
                      JSON
                    </option>
                    <option value="Another">
                      Another
                    </option>
                  </select>
                  <button className="Download Button">
                    <div className="Icon"></div>
                    <span className="Title">Скачать</span>
                  </button>
                  <button className="Copy Button">
                    <div className="Icon"></div>
                    <span className="Title">Скопировать</span>
                  </button>
                </div>
                <div className="Body">
                  <textarea className="TextArea" name="out" id="output" autoComplete="on" readOnly/>
                </div>
              </div>
            </div>
          </div>
          <div className="Footer">
            <button className="Convert Button Inactive" onClick={Convert}>Конвертировать</button>
          </div>
        </div>
        <div className="RightSide">
          <div className="Content">
            <div className="Container">
              <div className="Header">
                Параметры конвертации
              </div>
              <div className="Body">
                Контент блока
              </div>
            </div>
          </div>
          <div className="Footer">
            <button className="Apply Button">Применить</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
