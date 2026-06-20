import fs from "fs/promises";

export async function renderBookAdventure(adventure) {
    
    try {
        let bookAdventurePage = await fs.readFile("./src/views/book.html", "utf-8");
        
        return bookAdventurePage;
    } catch (error) {
        console.log(error.message);
    };
}