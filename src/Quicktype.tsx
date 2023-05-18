import { InferenceFlags } from "quicktype-core";
import {
    quicktype,
    InputData,
    jsonInputForTargetLanguage,
    JSONSchemaInput,
    FetchingJSONSchemaStore
  } from "quicktype-core";

  export default async function quicktypeJSON(targetLanguage: string, typeName: string, jsonString:string) {
    const jsonInput = jsonInputForTargetLanguage(targetLanguage);

    const options:InferenceFlags = {
        inferMaps: false,
        inferEnums: false,
        inferUuids: false,
        inferDateTimes: false,
        inferIntegerStrings: false,
        inferBooleanStrings: false,
        combineClasses: false,
        ignoreJsonRefs: false
    };
  
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

  async function quicktypeJSONSchema(targetLanguage:string, typeName:string, jsonSchemaString:string) {
    const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());

    // We could add multiple schemas for multiple types,
    // but here we're just making one type from JSON schema.
    await schemaInput.addSource({ name: typeName, schema: jsonSchemaString });

    const inputData = new InputData();
    inputData.addInput(schemaInput);

    return await quicktype({
        inputData,
        lang: targetLanguage
    });
}