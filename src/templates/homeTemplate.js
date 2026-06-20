import fs from "fs/promises";

export async function renderHome() {

    try {
        let homePage = await fs.readFile("./src/views/index.html", "utf-8");
        const dataJson = await fs.readFile("./src/data/data.json", "utf-8");
        const data = JSON.parse(dataJson);

        function adventureTemplate(adventure) {

            return `
                <li class="adventure-card">
                    <img src=${adventure.imageUrl} alt=${adventure.name}>
                    <h3>${adventure.name}</h3>
                    <p><span>Location: </span>${adventure.location}</p>
                    <p><span>Description: </span>${adventure.description}</p>
                    <ul class="buttons">
                        <li class="btn edit"><a href="/adventures/edit/${adventure.id}" class="button-card">Edit</a></li>
                        <li class="btn delete"><a href="" class="button-card">Delete</a></li>
                    </ul>
                </li>
            `
        }

        return homePage.replace("{{adventures}}", data.adventures.map((adventure) => adventureTemplate(adventure)).join("\n"));

    } catch (error) {
        console.log(error.message)
    }


}