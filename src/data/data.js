import axios from "axios";
import * as json from './energy-by-region.json';

const { data } = json;
const year = "2019";

export async function getLocationData(longitude, latitude) {
    const address = await getLocationAddress(longitude, latitude);
    const { county, state_district, city } = address;
    let locationData = data.find(i => i.LA === city && i.Year === year);

    // Adding a fall back to wider county if no city data found
    if (typeof locationData == "undefined")
    {
        locationData = data.find(i => i.LA === county && i.Year === year);
        return formatData(locationData, county);
    }

    // Adding a fall back to wider Region if no county data found
    if (typeof locationData == "undefined")
    {
        locationData = data.find(i => i.Region === state_district && i.Year === year);
        return formatData(locationData, state_district);
    }
    
    return formatData(locationData, city);
}

export function getNationalAverageData() {
    const nationalData = data.find(i => i.LA === "All local authorities" && i.Year === year);
    return formatData(nationalData, "National Average");
}

async function getLocationAddress(longitude, latitude) {
    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
    return res.data.address;
}

function formatData(data, location) {
    if (!data) {
        return null;
    }

    const percentageCoal = ((parseFloat(data.Coal_Total) / parseFloat(data.All_fuels_Total)) * 100).toFixed(2) + " %";
    const percentageManufactured = ((parseFloat(data.Manufactured_fuels_Total) / parseFloat(data.All_fuels_Total)) * 100).toFixed(2) + " %";
    const percentagePetroleum = ((parseFloat(data.Petroleum_Total) / parseFloat(data.All_fuels_Total)) * 100).toFixed(2) + " %";
    const percentageGas = ((parseFloat(data.Gas_Total) / parseFloat(data.All_fuels_Total)) * 100).toFixed(2) + " %";
    const percentageElectricity = ((parseFloat(data.Electricty_Total) / parseFloat(data.All_fuels_Total)) * 100).toFixed(2) + " %";
    const percentageBioenergy = ((parseFloat(data.Bioenergy_and_wastes_Total) / parseFloat(data.All_fuels_Total)) * 100).toFixed(2) + " %";

    const formattedData = { 
        location,
        percentageCoal,
        percentageManufactured,
        percentagePetroleum,
        percentageGas,
        percentageElectricity,
        percentageBioenergy
    };

    return formattedData;
}