import fs from "fs/promises";
import { v4 as uuidV4 } from "uuid";

const dataJson = await fs.readFile("./src/data/data.json", "utf-8");
const data = JSON.parse(dataJson);

export default {
    async getAll() {
        return data.locations;
    },
    async getLocationById(locationId) {
        const location = data.locations.find((x) => x.id === locationId);
        return location;
    },
    async add(name) {

        let error = data.locations.find((x) => x.name.toLowerCase() === name.toLowerCase());

        if (error) {
            return "<h1>This location already exists!<h1>";
        }
        
        const id = uuidV4();
        const newLocation = { id, name };
        
        data.locations.push(newLocation);
        await fs.writeFile("./src/data/data.json", JSON.stringify(data));
    }
}