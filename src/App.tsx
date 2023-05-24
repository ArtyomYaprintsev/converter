import { useState, ChangeEvent, MouseEvent } from "react";
import "./App.css";
import quicktypeJSON from "./Quicktype";
import { jsonInputForTargetLanguage } from "quicktype-core";

function App() {
  const test = '{"name":"Nirvana","founded":1987,"members":["Kurt Kobain","Dave Grohl","Krist Novoselic"]}'
  const options = 'TypeScript';

  const [input_value, setInput] = useState(test);
  const [output_area, setOutput] = useState('результат');
  let raw_convert:string[];
  let converted:string;

  const inputChangeHandler = (event:ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value)
  };

  const footerConvertHandler = (event: MouseEvent) =>{
    event.preventDefault();
    
    console.log(input_value);
    let raw = quicktypeJSON(options, 'name', input_value)
    //.then(result => {raw_convert = result.lines})
    .then(result => {
        //raw_convert = result.lines;
        
        const borders: number[] = []
        
        for(var i=0; i<result.lines.length; i++)
        {
          if (borders.length < 2)
          {
            if(result.lines[i] == "")
            {
              borders.push(i)
            }
          }
          else
          {
            console.log(borders)
            break
          }
        }
        
        var result_string = ""

        for (var i=borders[0]+1; i < borders[1]; i++)
        {
          result_string += result.lines[i] + '\n'
        }

        setOutput(result_string);

        //converted = JSON.parse(raw_convert.toString());
        //console.log(converted);
    })
    .catch(err => alert(err));   
  };

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
                  <textarea className="TextArea" name="in" id="in" autoComplete="on" autoFocus value={input_value} onChange={inputChangeHandler}/>
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
                  <textarea className="TextArea" name="out" id="output" autoComplete="on" readOnly value={output_area}/>
                </div>
              </div>
            </div>
          </div>
          <div className="Footer">
            <button className="Convert Button Inactive" onClick={footerConvertHandler}>Конвертировать</button>
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
