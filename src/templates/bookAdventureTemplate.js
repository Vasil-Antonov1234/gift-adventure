import fs from "fs/promises";

export async function renderBookAdventure(adventure) {

    try {
        let bookAdventurePage = await fs.readFile("./src/views/book.html", "utf-8");

        return bookAdventurePage.replace("{{bookAdventure}}", bookAdventureTemplate(adventure));
    } catch (error) {
        console.log(error.message);
    };
};

function bookAdventureTemplate(adventure) {
    return `
        <h2>Book</h2>
        <img src=${adventure.imageUrl}
            alt="${adventure.name}">
        <label for="name">Name</label>
        <input type="text" id="name" value=${adventure.name} disabled>
        <label for="description">Description</label>
        <textarea id="description"
            disabled>${adventure.description}</textarea>
        <label for="group">Location</label>
        <select id="group" disabled>
            <option value=${adventure.location}>${adventure.location}</option>
        </select>
    `
}