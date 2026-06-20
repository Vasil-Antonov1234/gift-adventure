import fs from "fs/promises";
import locationService from "../services/locationService.js";
import { locationTemplate } from "./addAdventureTemplate.js";

export async function renderEditAdventure(adventureId) {
    let editAdventurePage = await fs.readFile("./src/views/edit.html", "utf-8");
    const locations = await locationService.getAll();

    return editAdventurePage.replace("{{locations}}", locations.map((x) => locationTemplate(x)).join("/n"));
};