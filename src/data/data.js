import axios from "axios";
import * as json from './energy-by-region.json';

const { data } = json;
const year = "2019";

export async function getLocationData(longitude, latitude) {
    const address = await getLocationAddress(longitude, latitude);

    const { county, state_district } = address;
    const locationData = data.find(i => i.LA === county && i.Year === year);

    return formatData(locationData);
}

export function getNationalAverageData() {
    const nationalData = data.find(i => i.LA === "All local authorities" && i.Year === year);
    return formatData(nationalData);
}

async function getLocationAddress(longitude, latitude) {
    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
    return res.data.address;
}

function formatData(data) {
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
        percentageCoal,
        percentageManufactured,
        percentagePetroleum,
        percentageGas,
        percentageElectricity,
        percentageBioenergy
    };

    return formattedData;
}