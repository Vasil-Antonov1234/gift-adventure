import fs from "fs/promises";
import locationService from "./locationService.js";
import { v4 as uuidV4 } from "uuid";

const dataJson = await fs.readFile("./src/data/data.json", "utf-8");
const data = JSON.parse(dataJson);

export default {
    async add(newAdventure) {
    
        data.adventures.forEach((x) => {
            
            if (x.name === newAdventure.name) {
                return "<h1>This adventure already exists!<h1>"
            }

        });

        newAdventure.id = uuidV4();

        const location = await locationService.getLocationById(newAdventure.locationId);

        newAdventure.location = location.name;
        data.adventures.push(newAdventure);
        await fs.writeFile("./src/data/data.json", JSON.stringify(data))
    }
}