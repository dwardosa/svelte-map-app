import axios from "axios";
import * as json from './energy-by-region.json';

const { data } = json;
const year = "2019";

export function getLocationData(longtitude, latitude) {
    return new Promise((resolve, reject) => {
        getLocationAddress(longtitude, latitude)
            .then(address => {
                const { city, state_district } = address;
                const locationData = data.find(i => i.LA === city && i.Year === year);

                resolve(locationData);
            })
            .catch(reject);
    });
}

export function getNationalAverageData() {
    return data.find(i => i.LA === "All local authorities" && i.Year === year);
}

async function getLocationAddress(longtitude, latitude) {
    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longtitude}&zoom=18&addressdetails=1`);
    return res.data.address;
}

// "Year": "2014",
// "Code": "E06000025",
// "Region": "South West",
// "LA": "South Gloucestershire",
// "All_fuels_Domestic": "156.90141",
// "All_fuels_Transport": "286.66417",
// "All_fuels_Industrial_Commercial_and_other": "152.69433",
// "All_fuels_Total": "596.2599",
// "Coal_Industrial": "5.58265",
// "Coal_Commercial": "0.02526",
// "Coal_Domestic": "1.48793",
// "Coal_Rail": "0.00888",
// "Coal_Public_sector": "0.54929",
// "Coal_Agriculture": "0",
// "Coal_Total": "7.654",
// "Manufactured_fuels_Industrial": "0.14716",
// "Manufactured_fuels_Domestic": "1.31275",
// "Manufactured_fuels_Total": "1.45991",
// "Petroleum_Industrial": "23.93972",
// "Petroleum_Commercial": "0.55871",
// "Petroleum_Domestic": "7.42732",
// "Petroleum_Road_transport": "271.69452",
// "Petroleum_Rail": "5.95702",
// "Petroleum_Public_sector": "0.09335",
// "Petroleum_Agriculture": "4.19885",
// "Petroleum_Total": "313.86949",
// "Gas_Domestic": "98.90292",
// "Gas_Industrial_Commercial_and_other": "51.85357",
// "Gas_Total": "150.75649",
// "Electricity_Domestic": "39.12706",
// "Electricity_Industrial_Commercial_and_other": "65.52053",
// "Electricty_Total": "104.64759",
// "Bioenergy_and_wastes_Domestic": "8.64342",
// "Bioenergy_and_wastes_Road_transport": "9.00375",
// "Bioenergy_and_wastes_Industrial_and_Commercial": "0.22524",
// "Bioenergy_and_wastes_Total": "17.87242"