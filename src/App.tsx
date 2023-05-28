import { useState, ChangeEvent, MouseEvent, ChangeEventHandler } from "react";
import copysvg from "./assets/CopyIcon.svg"
import copiedsvg from "./assets/CopiedIcon.svg"
import "./App.css";
import quicktypeJSON from "./Quicktype";
import Popup from "./Popup/Popup";
import { messageError } from "quicktype-core";



function App() {
  const test = '{"name":"Nirvana","founded":1987,"members":["Kurt Kobain","Dave Grohl","Krist Novoselic"]}'
  const lang = 'TypeScript';

  const [input_value, setInput] = useState(test);
  const [output_value, setOutput] = useState('');
  const [popup, setPopup] = useState(false);
  const [enum_value, setEnum] = useState(true);
  const [interface_value, setInterface] = useState(true);
  const [similarclasses_value, setSimilarclasses] = useState(false);
  const [copied, setCopied] = useState('Скопировать');
  const [copiedpic, setCopiedPic] = useState(copysvg);

  const inputChangeHandler = (event:ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value)
  };

  function typeChange(text:string){
    if (text.includes('interface')){
      text = text.slice(0, 21) + ' =' + text.slice(21); //index of { - 22
      text.replace('interface', 'type'); //index of interface - 7
    };
    return(text);
  };

  const footerConvertHandler = (event: MouseEvent) => {
    event.preventDefault();
    
    quicktypeJSON(lang, 'JSON', input_value, enum_value, similarclasses_value)
    .then(result => {
        
        const borders: number[] = []
        
        for(let i=0; i<result.lines.length; i++)
        {
          if (borders.length == 0)
          {
            if(result.lines[i] == "")
            {
              borders.push(i)
            }
          }
          else
          {
            if (result.lines[borders[borders.length - 1] + 1].includes("//") && borders.length != 0)
            {
              console.log(i)
              console.log(borders)
              break
            }
            else
            {
              if(result.lines[i] == "")
              {
                borders.push(i)
              }
            }
          }
        }

        var result_string = ""

        for (let i=borders[0]+1; i < borders[borders.length-1]; i++)
        {
          if (interface_value){result_string += result.lines[i] + '\n';}
          else{result_string += typeChange(result.lines[i]) + '\n';}
        };

        setOutput(result_string);
    })
    .catch(err => {
      setPopup(true);
      console.log('error');
      alert(err);
    });   
  };

  const download = (event:MouseEvent) => {
    const element = document.createElement("a");
    const file = new Blob([output_value], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = lang +".txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  function copychange(img:string, text:string) {
    setCopied(text);
    setCopiedPic(img);
  };

  const copy = (event:MouseEvent) => {
    navigator.clipboard.writeText(output_value);
    copychange(copiedsvg, 'Скопировано'); //some naming
    setTimeout(copychange, 1000, copysvg, 'Скопировать');
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
            <div className={`BetweenStripe ${Boolean(input_value)?"Active":""}`}>
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
                      TypeScript
                    </option>
                    <option value="Another">
                      Another
                    </option>
                  </select>
                  <button className="Download Button" disabled={!Boolean(output_value)} onClick={download}> 
                    <div className="Icon"></div>
                    <span className="Title">Скачать</span>
                  </button>
                  <button className="Copy Button" disabled={!Boolean(output_value)} onClick={copy}>
                    <div className="Icon"><img src={copiedpic} alt="" /></div>
                    <span className="Title">{copied}</span>
                  </button>
                </div>
                <div className="Body">
                  <textarea className="TextArea" name="out" id="output" autoComplete="on" readOnly value={output_value} placeholder="После конвертации вы увидите здесь результат"/>
                </div>
              </div>
            </div>
          </div>
          <div className="Footer">
            <button className="Convert Button Inactive" onClick={footerConvertHandler} disabled={!Boolean(input_value)}>Конвертировать</button>
          </div>
        </div>
        <div className="RightSide">
          <div className="Content">
            <div className="Container">
              <div className="Header">
                Параметры конвертации
              </div>
              <div className="Body">
                <div className="RadioButtonGroup">
                  <div className="RadioButton">
                    <input type="radio" name="union" id="enum" onChange={()=>{setEnum(true)}} checked={Boolean(enum_value)} />
                    <label htmlFor="enum">Enum</label>
                  </div>
                  <div className="RadioButton">
                    <input type="radio" name="union" id="union" onChange={()=>{setEnum(false)}} />
                    <label htmlFor="union">Union</label>
                  </div>
                </div>
                <div className="RadioButtonGroup">
                  <div className="RadioButton">
                    <input type="radio" name="type" id="interface" onChange={()=>{setInterface(!interface_value)}} checked={Boolean(interface_value)} />
                    <label htmlFor="interface">Interface</label>
                  </div> 
                  <div className="RadioButton">
                    <input type="radio" name="type" id="type" onChange={()=>{setInterface(!interface_value)}} />
                    <label htmlFor="type">Type</label>
                  </div>
                </div>
                <input type="checkbox" name="classes" id="classes" onClick={()=>{setSimilarclasses(!similarclasses_value)}} />
                <label htmlFor="classes">Обобщить похожие классы</label>
                {/* <button onClick={()=>setPopup(true)}>Ошибка</button>
                <Popup open={setPopup} /> */}
              </div>
            </div>
          </div>
          <div className="Footer">
            <button className="Apply Button" onClick={()=>{console.log('Да, эта кнопка ничего не делает')}}>Применить</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;