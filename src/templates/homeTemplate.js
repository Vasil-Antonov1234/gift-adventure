import fs from "fs/promises";

export async function renderHome() {
    
    try {
        let homePage = await fs.readFile("./src/views/index.html", "utf-8");
        const dataJson = await fs.readFile("./src/data/data.json", "utf-8");
        const data = JSON.parse(dataJson);

        // const homeTemplate = `
        //     <li class="adventure-card">
        //         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Cappadocia_balloon_trip%2C_Ortahisar_Castle_%2811893715185%29.jpg/330px-Cappadocia_balloon_trip%2C_Ortahisar_Castle_%2811893715185%29.jpg" alt="Cappadocia">
        //         <h3>Cappadocia</h3>
        //         <p><span>Location: </span>Turkey</p>
        //         <p><span>Description: </span>Cappadocia is a historical region in Central Anatolia region, Turkey.</p>
        //         <ul class="buttons">
        //             <li class="btn edit"><a href="" class="button-card">Edit</a></li>
        //             <li class="btn delete"><a href="" class="button-card">Delete</a></li>
        //         </ul>
        //     </li>
        // `


        const adventures = []; 

        data.map((x) => {
            adventures.push(
                `
                <li class="adventure-card">
                    <img src=${x.imageUrl} alt="Cappadocia">
                    <h3>${x.name}</h3>
                    <p><span>Location: </span>${x.location}</p>
                    <p><span>Description: </span>${x.description}</p>
                    <ul class="buttons">
                        <li class="btn edit"><a href="" class="button-card">Edit</a></li>
                        <li class="btn delete"><a href="" class="button-card">Delete</a></li>
                    </ul>
             </li>
                `
            )
        })

        const result = adventures.join("\n");

        homePage = homePage.replace("{{adventures}}", result);

        return homePage;

        
    } catch (error) {
        alert(error.message)
    }

    
}