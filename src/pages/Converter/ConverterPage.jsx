import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import quicktypeJSON from "../../utils/quicktype";
import ErrorPopup from "../../components/Popup";
import SettingsBar from "../../components/SettingsBar";
import CopyButton from "../../components/CopyButton";
import ClipIcon from "../../components/ClipIcon";
import DownloadIcon from "../../components/DownloadIcon";

import "../../styles/converter.scss";

const INPUT_MAP = {
  ENUM_OR_UNION: {
    name: "enum-or-union",
    isEnum: "is-enum",
    isUnion: "is-union",
  },
  TYPE_OR_INTERFACE: {
    name: "type-or-interface",
    isType: "is-type",
    isInterface: "is-interface",
  },
  SUMMARIZE_SIMILAR_CLASSES: {
    name: "summarize-similar-classes",
  },
  USE_CAMEL_CASE: {
    name: "use-camel-case",
  },
};

const ConverterPage = () => {
  const [error, setError] = useState("");
  const [isOutputExists, setIsOutputExists] = useState(false);
  const [isInitialView, setIsInitialView] = useState(true);

  const { register, handleSubmit, setValue } = useForm();

  const outputAreaRef = useRef();
  const downloadLinkRef = useRef();

  const reader = new FileReader();
  reader.onload = (e) => setValue("input-json", e.target.result);
  reader.onerror = () => setError("Error on reading file, try another file.");

  const convertHandler = (data) => {
    quicktypeJSON(
      "TypeScript",
      "'input-json'",
      data["input-json"],
      data[INPUT_MAP.ENUM_OR_UNION.name] === INPUT_MAP.ENUM_OR_UNION.isEnum,
      data[INPUT_MAP.SUMMARIZE_SIMILAR_CLASSES.name]
    )
      .then(({ lines }) => {
        const output = [];
        const pattern = /^export interface (?<name>[A-Za-z]+) {$/;

        for (let line of lines) {
          if (line === "// Converts JSON strings to/from your types") break;
          if (line.startsWith("//")) continue;

          if (
            data[INPUT_MAP.TYPE_OR_INTERFACE.name] ===
            INPUT_MAP.TYPE_OR_INTERFACE.isType
          ) {
            const match = line.match(pattern);
            if (match) line = `export type ${match.groups.name} = {`;
          }

          output.push(line);
        }

        outputAreaRef.current.value = output.join("\r\n").trim();
        setIsOutputExists(true);
      })
      .catch((err) => {
        console.error("ERROR", err.message);
        setError(err.message);
      });
  };

  const downloadHandler = useCallback(() => {
    const downloadLink = downloadLinkRef.current;
    const currentOutput = outputAreaRef.current;

    if (!currentOutput || !downloadLink) return;

    const file = new Blob([currentOutput.value], {
      type: "text/plain",
    });
    downloadLink.href = URL.createObjectURL(file);
    downloadLink.click();
  }, []);

  const copyHandler = useCallback(() => {
    const currentOutput = outputAreaRef.current;

    if (!currentOutput) return;
    if (!navigator.clipboard) {
      alert("Navigator clipboard is missing, can not to copy output.");
      return;
    }

    navigator.clipboard.writeText(currentOutput.value);
  }, []);

  return (
    <div className='converter-page page' id='converter'>
      <form onSubmit={handleSubmit(convertHandler)}>
        <div
          className={["general__container", isInitialView ? "initial" : ""]
            .join(" ")
            .trim()}
        >
          <div className='input__container'>
            <header>
              <div className='logo'>
                <span className='capital'>К</span>
                <span>онвертер</span>
              </div>

              <div className='title'>из JSON</div>
              <div className='manage'>
                <input
                  type='file'
                  id='inputFile'
                  className=''
                  autoComplete='off'
                  accept='.json,.txt'
                  {...register("input-file", {
                    onChange: (e) => {
                      const files = e.target.files;
                      const file = files[0];

                      if (file) reader.readAsText(file, "utf-8");
                      setValue("input-file", null);
                    },
                  })}
                />
                <label htmlFor='inputFile' className='upload-file-btn btn'>
                  <div className='decoration'>
                    <ClipIcon />
                  </div>
                  <div className='text'>Выбрать файл</div>
                </label>
              </div>
            </header>
            <div
              className='textarea__wrapper'
              title='Вставьте содержимое файла json или прикрепите файл'
              data-hint='Исходный JSON'
            >
              <textarea
                onFocus={() => setIsInitialView(false)}
                {...register("input-json", {
                  required: "The input can not be blank.",
                })}
              />
            </div>
          </div>

          <div className='separate__bar'>
            <div className='line-decoration'></div>
            <div className='arrow-decoration'></div>
            <div className='line-decoration'></div>
          </div>

          <div className='output__container'>
            <header>
              <div className='title'>в Type DTO</div>
              <div className='manage'>
                <button
                  type='button'
                  className='download-btn btn'
                  onClick={downloadHandler}
                  disabled={!isOutputExists}
                >
                  <div className='decoration'>
                    <DownloadIcon />
                  </div>
                  <div className='text'>Скачать</div>
                </button>

                <a
                  href='#'
                  download='type-dto.ts'
                  ref={downloadLinkRef}
                  style={{ display: "none" }}
                ></a>

                <CopyButton onClick={copyHandler} disabled={!isOutputExists} />
              </div>
            </header>
            <div
              className='textarea__wrapper'
              title='После конвертации вы увидите здесь результат'
              data-hint='Результат'
            >
              <textarea
                ref={outputAreaRef}
                style={{ whiteSpace: "pre-wrap" }}
                onChange={(e) => setIsOutputExists(Boolean(e.target.value))}
                onFocus={() => setIsInitialView(false)}
              />
            </div>
          </div>

          <div className='submit__container'>
            <button type='submit'>Конвертировать</button>
          </div>
        </div>

        <SettingsBar>
          <header>Параметры конвертации</header>

          <div className='general-settings'>
            <div className='radio-input__wrapper'>
              <div className='title'>Выберите формат объединения</div>
              <div className='radio-input__choices'>
                <div>
                  <input
                    type='radio'
                    name={INPUT_MAP.ENUM_OR_UNION.name}
                    id={INPUT_MAP.ENUM_OR_UNION.isEnum}
                    value={INPUT_MAP.ENUM_OR_UNION.isEnum}
                    defaultChecked
                    {...register(INPUT_MAP.ENUM_OR_UNION.name)}
                  />

                  <label htmlFor={INPUT_MAP.ENUM_OR_UNION.isEnum}>ENUM</label>
                </div>

                <div>
                  <input
                    type='radio'
                    name={INPUT_MAP.ENUM_OR_UNION.name}
                    id={INPUT_MAP.ENUM_OR_UNION.isUnion}
                    value={INPUT_MAP.ENUM_OR_UNION.isUnion}
                    {...register(INPUT_MAP.ENUM_OR_UNION.name)}
                  />

                  <label htmlFor={INPUT_MAP.ENUM_OR_UNION.isUnion}>UNION</label>
                </div>
              </div>
            </div>
            <div className='radio-input__wrapper'>
              <div className='title'>Выберите формат выходящих данных</div>
              <div className='radio-input__choices'>
                <div>
                  <input
                    type='radio'
                    name={INPUT_MAP.TYPE_OR_INTERFACE.name}
                    id={INPUT_MAP.TYPE_OR_INTERFACE.isType}
                    value={INPUT_MAP.TYPE_OR_INTERFACE.isType}
                    defaultChecked
                    {...register(INPUT_MAP.TYPE_OR_INTERFACE.name)}
                  />

                  <label htmlFor={INPUT_MAP.TYPE_OR_INTERFACE.isType}>
                    TYPE
                  </label>
                </div>

                <div>
                  <input
                    type='radio'
                    name={INPUT_MAP.TYPE_OR_INTERFACE.name}
                    id={INPUT_MAP.TYPE_OR_INTERFACE.isInterface}
                    value={INPUT_MAP.TYPE_OR_INTERFACE.isInterface}
                    {...register(INPUT_MAP.TYPE_OR_INTERFACE.name)}
                  />

                  <label htmlFor={INPUT_MAP.TYPE_OR_INTERFACE.isInterface}>
                    INTERFACE
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className='additional-settings'>
            <div className='checkbox-input__wrapper'>
              <input
                type='checkbox'
                id={INPUT_MAP.SUMMARIZE_SIMILAR_CLASSES.name}
                {...register(INPUT_MAP.SUMMARIZE_SIMILAR_CLASSES.name)}
              />
              <label htmlFor={INPUT_MAP.SUMMARIZE_SIMILAR_CLASSES.name}>
                Обобщить похожие классы
              </label>
            </div>
            <div
              className='checkbox-input__wrapper'
              title='Temporary unavailable'
            >
              <input
                type='checkbox'
                id={INPUT_MAP.USE_CAMEL_CASE.name}
                disabled
              />
              <label htmlFor={INPUT_MAP.USE_CAMEL_CASE.name}>
                Изменить JSON.key на CamelCase
              </label>
            </div>
          </div>

          <footer>
            <div className='version'>
              <Link
                to='https://github.com/ArtyomYaprintsev/converter/'
                target='_blank'
              >
                v 1.2
              </Link>
            </div>
          </footer>
        </SettingsBar>
      </form>

      <ErrorPopup
        isOpened={Boolean(error)}
        content={error}
        closePopup={() => setError("")}
      />
    </div>
  );
};

export default ConverterPage;
