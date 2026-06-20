import http from "http";
import fs from "fs/promises";
import { renderHome } from "./templates/homeTemplate.js";
import locationService from "./services/locationService.js";
import { renderAddAdventure } from "./templates/addAdventureTemplate.js";
import adventureService from "./services/adventureService.js";
import { resourceUsage } from "process";
import { renderEditAdventure } from "./templates/editAdventureTemplate.js";

const server = http.createServer(async (req, res) => {

    if (req.method === "GET") {

        if (req.url.endsWith(".css")) {

            const tokens = req.url.split("/");
            const file = tokens[tokens.length - 1];

            try {
                const response = await fs.readFile(`./src/content/styles/${file}`, "utf-8");
                res.writeHead(200, { "content-type": "text/css" });

                res.write(response);
                return res.end();
            } catch (error) {
                console.log(error.message);
            }
        };

        let currentPage = "<h1>404 Page not found</h1>";

        if (req.url.endsWith("/")) {
            currentPage = await renderHome();
        };

        if (req.url.endsWith("/adventures/add-location")) {
            currentPage = await fs.readFile("./src/views/addLocation.html", "utf-8");
        };

        if (req.url.endsWith("/adventures/add-adventure")) {
            currentPage = await renderAddAdventure();
        };

        if (req.url.startsWith("/adventures/edit")) {
            const adventure = adventureService.getAdventureById();
            
            currentPage = await renderEditAdventure();
        };

        res.writeHead(200, { "content-type": "text/html" });
        res.write(currentPage);

        return res.end();
    };

    if (req.method === "POST") {

        if (req.url.endsWith("/adventures/add-location")) {
            let body = "";
            
            req.on("data", (chunk) => {
                body += chunk;
            });

            req.on("end", async () => {
                const formData = new URLSearchParams(body);
                const name = formData.get("locaton");
                
                try {
                    const result = await locationService.add(name);

                    if (result) {
                        res.write(result);
                        return res.end();
                    }

                    res.writeHead(302, { location: "/"});
                    return res.end();
                } catch (error) {
                    console.log(error.message)
                }

            });

        };

        if (req.url.endsWith("/adventures/add-adventure")) {
            let body = "";

            req.on("data", (chunk) => {
                body += chunk;
            });

            req.on("end", async () => {
                const formData = new URLSearchParams(body);
                // const formData = new FormData(body);
                const name = formData.get("name");
                const description = formData.get("description");
                // const uploadImage = formData.get("uploadImage");
                const imageUrl = formData.get("imageUrl");
                const locationId = formData.get("location");

                try {
                    const result = await adventureService.add({ name, description, imageUrl, locationId });

                    if (result) {
                        res.write(result);
                        return res.end();
                    };

                    res.writeHead(302, { location: "/"});
                    return res.end();
                } catch (error) {
                    console.log(error.message)
                }
            })
        }

    }

});

server.listen(5000, () => console.log("Server is listening on http://localhost:5000..."));