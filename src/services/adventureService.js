import fs from "fs/promises";

const dataJson = await fs.readFile("./src/data/data.json", "utf-8");
const data = JSON.parse(dataJson);

export default {
    async add(newAdventure) {
    
        data.adventures.forEach((x) => {
            
            if (x.name === newAdventure.name) {
                return "<h1>This adventure already exists!<h1>"
            }

        });

        newAdventure.id = data.idCount;
        data.idCount = data.idCount + 1;
        data.adventures.push(newAdventure);
        await fs.writeFile("./src/data/data.json", JSON.stringify(data))
    }
}