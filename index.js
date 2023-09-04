const express = require('express');
const app = express();

//middleware necesarios!!
app.use(express.urlencoded({extended : false}));
app.use(express.json());

// Rutas --- 

//ruta raiz
app.get('/' , (req, res) =>{
    res.send("hola! bienvenido");
});

//ruta de la api
app.get('/api', (req, res)=>{
    res.json({
        tuits: [
            {
                id : 0,
                text : "This is my first tuit",
                username : "Nicolas"
            },
            {
                id : 1,
                text : "Second tuit in time limit",
                username : "Tito"
            }
        ]
    })
})

//ruta de autenticacion
app.get('/login', (req, res) =>{
    res.send(
        `<html>
            <head>
                <title>Login</title>
            </head>
            <body>
            <form method="POST" action="/auth">
                User name: <input type="text" name="text"><br/>
                Password: <input type="password" name="password"><br/>
                <input type="submit" value="log in"/>
            </form>
            </body>
        </html>`
    )
})

//ruta post /auth
app.post('/auth', (req, res)=>{
    const {username, password} = req.body;

    //aqui deberiamos consultar en la db y validar si existe usuario y password
    const user = {username : username};

    //?Generamos un token general de acceso

    const accessToken = generateAccessToken(user);
})

//! Creamos la funcion para generarlo

function generateAccessToken(user){
    
}

// Servidor onLine ---
app.listen(3001, ()=>{
    console.log("Listen to 3001");
})

