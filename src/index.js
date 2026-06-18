import http from "http";
import fs from "fs/promises";

const server = http.createServer(async (req, res) => {

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
        currentPage = await fs.readFile("./src/views/index.html", "utf-8");
    };
    
    if (req.url.endsWith("/adventures/add-location")) {
        currentPage = await fs.readFile("./src/views/addLocation.html"); 
    };

    if (req.url.endsWith("/adventures/add-adventure")) {
        currentPage = await fs.readFile("./src/views/addAdventure.html");
    };

    res.writeHead(200, { "content-type": "text/html" });
    res.write(currentPage);

    res.end();
});

server.listen(5000, () => console.log("Server is listening on http://localhost:5000..."));