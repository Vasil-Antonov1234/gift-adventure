import fs from "fs/promises";

export async function renderHome() {
    
    try {
        let homePage = await fs.readFile("./src/views/index.html", "utf-8");
        const dataJson = await fs.readFile("./src/data/data.json", "utf-8");
        const data = JSON.parse(dataJson);

        function adventureTemplate(adventure) {
            
            return `
                <li class="adventure-card">
                    <img src=${adventure.imageUrl} alt="Cappadocia">
                    <h3>${adventure.name}</h3>
                    <p><span>Location: </span>${adventure.location}</p>
                    <p><span>Description: </span>${adventure.description}</p>
                    <ul class="buttons">
                        <li class="btn edit"><a href="" class="button-card">Edit</a></li>
                        <li class="btn delete"><a href="" class="button-card">Delete</a></li>
                    </ul>
                </li>
            `
        } 


        const adventures = []; 

        data.map((adventure) => {
            adventures.push(
                adventureTemplate(adventure)
            )
        })

        const result = adventures.join("\n");

        homePage = homePage.replace("{{adventures}}", result);

        return homePage;

        
    } catch (error) {
        alert(error.message)
    }

    
}