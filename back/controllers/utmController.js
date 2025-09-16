import {appendUTMParams, defaultUTMs, generateUTMsForType} from "../utils/generateUTM.js";

export const generateDefaultUTM = (req, res) => {
    const {url, type} = req.body;

    if(!url || !type || !defaultUTMs[type]){
        return res.status(400).json({error: 'Parametros invalidos'})
    }

    const result = generateUTMsForType(url, defaultUTMs[type]);

    // Si es un array
    if(Array.isArray(result)){
        return res.json({urls: result})
    }
    return res.json({utm_url: result});
}

export const generateCustomUTM = (req, res) =>{
    const {url, ...params} = req.body;

    if(!url){
        return res.status(400).json({error: "La URL es obligatoria"})
    }

    const urlParams = Object.entries(params).reduce((acc, [key, value]) =>{
        if (key.startsWith("utm_") && value) {
            acc[key] = value;
          }
          return acc;
    },{})

    const finalUrl = appendUTMParams(url, urlParams);

    return res.json({utm_url: finalUrl})
}


