import {
    quicktype,
    InputData,
    jsonInputForTargetLanguage
  } from "quicktype-core";
  
// export let convertoptions:InferenceFlags = {
//     inferMaps: false,
//     inferEnums: false,
//     inferUuids: false,
//     inferDateTimes: false,
//     inferIntegerStrings: false,
//     inferBooleanStrings: false,
//     combineClasses: false,
//     ignoreJsonRefs: false
// };

export default async function quicktypeJSON(targetLanguage: string, typeName: string, jsonString:string, enums:boolean, classes:boolean) {
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
        lang: targetLanguage,
        inferEnums: enums,
        combineClasses:classes
    });
}