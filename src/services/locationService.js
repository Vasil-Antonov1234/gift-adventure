import fs from "fs/promises";
import { v4 as uuidV4 } from "uuid";

const dataJson = await fs.readFile("./src/data/data.json", "utf-8");
const data = JSON.parse(dataJson);

export default {
    async getAll() {
        return data.locations;
    },
    async getLocationById(locationId) {
        // const location = data.locations.find((x) => x === locationId);
        const location = data.locations.filter((x) => x.id === Number(locationId));
        return location[0];
    },
    async add(name) {

        let error = "";

        data.locations.forEach((x) => {
            if (x.name.toLowerCase() === name.toLowerCase()) {
                error = "<h1>This location already exists!<h1>";
            };
        })

        if (error) {
            return error
        }
        
        const id = uuidV4();
        const newLocation = { id, name };
        
        data.locations.push(newLocation);
        await fs.writeFile("./src/data/data.json", JSON.stringify(data));
    }
}