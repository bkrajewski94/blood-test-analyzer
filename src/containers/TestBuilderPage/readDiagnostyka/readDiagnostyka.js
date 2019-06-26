import FuzzySet from "fuzzyset.js";

import * as neuralFunctions from "./diagnostykaNeuralNetwork";

const namesMorphology = [
  "Leukocyty",
  "Erytrocyty",
  "Hemoglobina",
  "Hematokryt",
  "MCV",
  "MCH",
  "MCHC",
  "Płytki",
  "RDW_CV",
  "PDW",
  "MPV",
  "P-LCR",
  "Neutrofile",
  "Limfocyty",
  "Monocyty",
  "Eozynofile",
  "Bazofile"
];
const namesThyroid = ["TSH", "FT3", "FT4", "anty_TPO", "anty_TG"];
const namesGlucoze = ["Glukoza", "Insulina"];
const namesLiver = ["AST", "ALT"];
const bloodTestNames = [
  ...namesMorphology,
  ...namesThyroid,
  ...namesGlucoze,
  ...namesLiver
];

const withPercentMorphology = [
  "Neutrofile %",
  "Limfocyty %",
  "Monocyty %",
  "Eozynofile %",
  "Bazofile %"
];

const fuzy = FuzzySet(bloodTestNames);

const neuralDevidersLibrary = {
  rbc: 100, 
  wbc: 12,
  liver: 400,
  thyriod: 10,
  glucoze: 400,
  hashimoto: 200,
  allergy: 10
};

const getName = line => {
  const element = line.split(" ")[0];
  const result =
    fuzy.get(element) &&
    fuzy.get(element)[0][0] > 0.6 &&
    fuzy.get(element)[0][1];
  if (line.includes("%") && withPercentMorphology.includes(`${result} %`)) {
    return `${result} %`;
  }
  if (result) {
    return result;
  }
};

const findReferenceIndex = line => {
  const dataLine = line.replace(/—/g, "-");
  const baseIndex = dataLine
    .split(" ")
    .reduce((val, cur, i) => {
      if (cur.includes("-")) {
        return [...val, i];
      }
      return val;
    }, [])
    .slice(-1)[0];

  return baseIndex;
};

const getValue = line => {
  const baseIndex = findReferenceIndex(line);
  const elements = line.split(" ");
  for (let i = baseIndex - 2; i >= 0; i--) {
    if (
      parseFloat(
        elements[i]
          .replace(",", ".")
          .replace("<", "")
          .replace(">", "")
      )
    ) {
      return elements[i]
        .replace(",", ".")
        .replace("<", "")
        .replace(">", "");
    }
  }
};

const interpretResults = data => {
  const interpretedData = {};

  if(data.Erytrocyty && data.Hematokryt && data.MCV) {
    if(data.Erytrocyty.value && data.Hematokryt.value && data.MCV.value) {
      const rbcData = {
        erytrocyty: data.Erytrocyty.value / neuralDevidersLibrary.rbc,
        hematokryt: data.Hematokryt.value / neuralDevidersLibrary.rbc,
        mcv: data.MCV.value / neuralDevidersLibrary.rbc
      }
      interpretedData.rbc = neuralFunctions.rbc(rbcData);
    }
  }

  if(data.Leukocyty && data.Limfocyty && data.Neutrofile){
    if(data.Leukocyty.value && data.Limfocyty.value && data.Neutrofile.value){
      const wbcData = {
        leukocyty: data.Leukocyty.value / neuralDevidersLibrary.wbc,
        limfocyty: data.Limfocyty.value / neuralDevidersLibrary.wbc,
        neutrofile: data.Neutrofile.value / neuralDevidersLibrary.wbc
      }
      interpretedData.wbc = neuralFunctions.wbc(wbcData);
    }
  } 

  if(data.AST && data.ALT){
    if(data.AST.value && data.ALT.value){
      const liverData = {
        ast: data.AST.value / neuralDevidersLibrary.liver,
        alt: data.ALT.value / neuralDevidersLibrary.liver
      }
      interpretedData.liver = neuralFunctions.liver(liverData);
    }
  } 

  if(data.TSH && data.FT3 && data.FT4){
    if(data.TSH.value && data.FT3.value && data.FT4.value){
      const thyriodData = {
        tsh: data.TSH.value / neuralDevidersLibrary.thyriod,
        ft3: data.FT3.value / neuralDevidersLibrary.thyriod,
        ft4: data.FT4.value / neuralDevidersLibrary.thyriod
      }
      interpretedData.thyriod = neuralFunctions.thyriod(thyriodData);
    }
  } 

  if(data.Glukoza && data.Insulina){
    if(data.Glukoza.value && data.Insulina.value){
      const glucozeData = {
        glukoza: data.Glukoza.value / neuralDevidersLibrary.glucoze,
        insulina: data.Insulina.value / neuralDevidersLibrary.glucoze
      }
      interpretedData.glucoze = neuralFunctions.glucoze(glucozeData);
    }
  } 

  if(data.anty_TPO && data.anty_TG){
    if(data.anty_TPO.value && data.anty_TG.value){
      const hashimotoData = {
        aTpo: data.anty_TPO.value / neuralDevidersLibrary.hashimoto,
        aTg: data.anty_TG.value / neuralDevidersLibrary.hashimoto
      }
      interpretedData.hashimoto = neuralFunctions.hashimoto(hashimotoData);
    }
  } 

  if(data.Eozynofile && data.Bazofile){
    if(data.Eozynofile.value && data.Bazofile.value){
      const allergyData = {
        eozynofile: data.Eozynofile.value / neuralDevidersLibrary.allergy,
        bazofile: data.Bazofile.value / neuralDevidersLibrary.allergy
      }
      interpretedData.allergy = neuralFunctions.allergy(allergyData);
    }
  } 
  
  console.log(interpretedData);
};

export const readDiagnostyka = data => {
  const results = data.map(line => {
    const name = getName(line);
    if (name) {
      return {
        name: name,
        value: getValue(line)
      };
    }
  });

  const bloodData = results.reduce((val, cur) => {
    if (cur && cur.name) {
      return {
        ...val,
        [cur.name]: cur
      };
    }
    return val;
  }, {});

  interpretResults(bloodData);
};
