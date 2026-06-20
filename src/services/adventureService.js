import fs from "fs/promises";
import locationService from "./locationService.js";
import { v4 as uuidV4 } from "uuid";

const dataJson = await fs.readFile("./src/data/data.json", "utf-8");
const data = JSON.parse(dataJson);

export default {
    async getAdventureById(adventureId) {
        return data.adventures.find((x) => x.id === adventureId);
    },
    async add(newAdventure) {

        let error = data.adventures.find((x) => x.name.toLowerCase() === newAdventure.name.toLowerCase());
    
        if (error) {
            return "<h1>This adventure already exists!<h1>";
        };

        newAdventure.id = uuidV4();

        const location = await locationService.getLocationById(newAdventure.locationId);

        newAdventure.location = location.name;
        data.adventures.push(newAdventure);
        await fs.writeFile("./src/data/data.json", JSON.stringify(data))
    },
    async editAdventure(newAdventure, oldAdventure) {
        
        try {
            const newLocation = await locationService.getLocationById(newAdventure.locationId);
            
            data.adventures.forEach((x) => {
                if (x.id === oldAdventure.id) {
                    x.name = newAdventure.name;
                    x.description = newAdventure.description,
                    x.imageUrl = newAdventure.imageUrl,
                    x.location = newLocation.name
                }
            });
    
            await fs.writeFile("./src/data/data.json", JSON.stringify(data));     
        } catch (error) {
            console.log(error.message)
        }
    },
    async deleteAdventureById(adventureId) {
        const filteredAdventures = data.adventures.filter((x) => x.id !== adventureId);

        data.adventures = filteredAdventures;
        try {
          await fs.writeFile("./src/data/data.json", JSON.stringify(data));  
        } catch (error) {
            console.log(error.message);
        };
    }
}