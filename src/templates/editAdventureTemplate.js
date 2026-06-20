import fs from "fs/promises";
import locationService from "../services/locationService.js";
import { locationTemplate } from "./addAdventureTemplate.js";

export async function renderEditAdventure(adventure) {
    let editAdventurePage = await fs.readFile("./src/views/edit.html", "utf-8");
    const locations = await locationService.getAll();

    return editAdventurePage.replace("{{currentAdventure}}", editAdventureTemplate(adventure)).replace("{{locations}}", locations.map((x) => locationTemplate(x)).join("/n"));
};

function editAdventureTemplate(adventure) {
    return `
        <h2>Edit</h2>
        <label for="name">Name</label>
        <input type="text" name="name" id="name" value=${adventure.name}>
        <label for="description">Description</label>
        <textarea id="description" name="description">${adventure.description}</textarea>
        <label for="image">Image</label>
        <input type="url" id="image" name="imageUrl" value=${adventure.imageUrl}>
        <label for="group">Location</label>
        <select id="group">
            {{locations}}
        </select>
    `
}