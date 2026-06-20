import fs from "fs/promises";

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
        
        if (data.locations.indexOf(name) !== -1) {
            return "<h1>This location already exists!<h1>"
        };
        
        data.locations.push(name);
        await fs.writeFile("./src/data/data.json", JSON.stringify(data));
    }
}