import fs from "fs/promises";
import locationService from "../services/locationService.js";

export function locationTemplate(location) {
    return `
        <option value=${location.id}>${location.name}</option>
    `;
};

export async function renderAddAdventure() {
    let addAdventurePage = await fs.readFile("./src/views/addAdventure.html", "utf-8");
    const locations = await locationService.getAll();


    return addAdventurePage.replace("{{locations}}", locations.map((x) => locationTemplate(x)).join("/n"));
}