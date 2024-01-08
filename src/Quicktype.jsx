import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from "quicktype-core";

export default async function quicktypeJSON(
  targetLanguage,
  typeName,
  jsonString,
  enums,
  classes
) {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);

  // We could add multiple samples for the same desired
  // type, or many sources for other types. Here we're
  // just making one type from one piece of sample JSON.

  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  return await quicktype({
    inputData,
    lang: targetLanguage,
    inferEnums: enums,
    combineClasses: classes,
  });
}
