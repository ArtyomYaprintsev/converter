import { useState, ChangeEvent, MouseEvent, ChangeEventHandler } from "react";
import "./App.css";
import quicktypeJSON from "./Quicktype";


function App() {
  const test = '{"name":"Nirvana","founded":1987,"members":["Kurt Kobain","Dave Grohl","Krist Novoselic"]}'
  const lang = 'TypeScript';

  const [input_value, setInput] = useState(test);
  const [output_area, setOutput] = useState('');
  const [enum_value, setEnum] = useState(true);
  const [interface_value, setInterface] = useState(true);
  const [similarclasses_value, setSimilarclasses] = useState(false)

  const inputChangeHandler = (event:ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value)
  };

  const footerConvertHandler = (event: MouseEvent) =>{
    event.preventDefault();
    
    console.log(input_value);
    let raw = quicktypeJSON(lang, 'name', input_value, enum_value, similarclasses_value)
    .then(result => {

    })
    .catch(err => alert(err));   
  };

  const footerParmsHandler = (event: MouseEvent) => {
    console.log('да, эта кнопка ничего не делает')
  };

  const bebebe = (event: ChangeEvent) => {
    setEnum(!enum_value);
    console.log(enum_value);
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
                  <textarea className="TextArea" name="in" id="in" autoComplete="on" autoFocus value={input_value} onChange={inputChangeHandler} placeholder="Вставьте содержимое файла json или прикрепите файл"/>
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
                  <textarea className="TextArea" name="out" id="output" autoComplete="on" readOnly value={output_area} placeholder="После конвертации вы увидите здесь результат"/>
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
                <div>
                  <input type="radio" name="union" id="enum" onChange={()=>{setEnum(!enum_value)}} />
                  <label htmlFor="enum">Enum</label>
                  <input type="radio" name="union" id="union" onChange={()=>{setEnum(!enum_value)}} />
                  <label htmlFor="union">Union</label>
                </div>
                <div>
                  <input type="radio" name="type" id="type" onChange={()=>{setInterface(!interface_value)}} />
                  <label htmlFor="type">Type</label>
                  <input type="radio" name="interface" id="interface" onChange={()=>{setInterface(!interface_value)}} />
                  <label htmlFor="interface">Interface</label>
                </div>
                <input type="checkbox" name="classes" id="classes" onClick={()=>{setSimilarclasses(!similarclasses_value)}}/>
                <label htmlFor="classes">Обобщить похожие классы</label>
              </div>
            </div>
          </div>
          <div className="Footer">
            <button className="Apply Button" onClick={footerParmsHandler}>Применить</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;