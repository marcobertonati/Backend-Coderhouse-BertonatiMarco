// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp, contentTypeFilter } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();

const colours:String[] = [];


app.get('/', async (req) => {
    await req.respond({
        status:200,
        headers: new Headers({
            "content-type": "text/html; charset=UTF-8"
        }),
        body: ReactDOMServer.renderToString(
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <title style={{color:'white'}}>Desafio 47</title>
                </head>
                <body style={{backgroundColor: 'black'}}>
                    <h1 style={{color:'white'}}>
                        Desafio 47
                    </h1>

                    <h2 style={{color:'white'}}>Agrega colores</h2>

                        <form action='/color' method='POST'>

                            <input type="text" id="color" name="color"></input>
                            <input type="submit" value="Submit"></input>
                        </form>


                    <h3 style={{color:'white'}}>Lista de colores</h3>

                    {
                        colours.length <= 0 ? <span style={{color:'white'}}>No hay colores cargados</span> : colours.map(colour => {
                            return(
                            <ul style={{color:`${colour}`}}>{colour}</ul>)
                        })
                    }

                </body>
            </html>
        )
    })
})

app.post("/color", contentTypeFilter("application/x-www-form-urlencoded"), async (req) => {
    console.log('Ingresó a /color')
    const body = await req.formData()
    const colourFromForm: String = body.value("color")!;
    colours.push(colourFromForm);
    req.redirect('/')
})

app.listen({ port: 8080 });