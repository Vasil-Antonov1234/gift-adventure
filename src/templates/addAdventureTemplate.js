import fs from "fs/promises";
import locationService from "../services/locationService.js";

export async function renderAddAdventure() {
    let addAdventurePage = await fs.readFile("./src/views/addAdventure.html", "utf-8");
    const locations = await locationService.getAll();

    function locationTemplate(location) {
        return `
            <option value="Egipt">${location}</option>
        `;
    };

    return addAdventurePage.replace("{{locations}}", locations.map((x) => locationTemplate(x)).join("/n"));
}