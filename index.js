const express = require('express');
const app = express(); //express para que inicie el servidor
const jwt = require('jsonwebtoken') //importacion de la libreria jwt
require('dotenv').config();  //configuracion de .env


//middleware necesarios!!
app.use(express.urlencoded({extended : false}));
app.use(express.json());

// Rutas --- 

//ruta raiz
app.get('/' , (req, res) =>{
    res.send("hola! bienvenido");
});

//ruta de la api
app.get('/api', validateToken, (req, res)=>{    //!  Aqui le coloco el middleware (validateToken) para darle seguridad a la api
    res.json({
        username : req.user,
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

    //!Generamos un token general de acceso

    const accessToken = generateAccessToken(user);

    res.header('autorization', accessToken).json({
        message : 'Usuario autenticado',
        token : accessToken
    })  //resp al usuario, nuestro token + json para personalizarlo mas.
})


//! Creamos la funcion para generarlo
//esta funcion nos permite dar la firma (sing)
function generateAccessToken(user){
    return jwt.sign(user, process.env.SECRET, {expiresIn : '5m'}) //aqui va la palabra secreta que la tengo en el .env, luego viene la expiracion.
}

//!  Middleware  -  funcion para validar el token
function validateToken (req, res, next){        
    const accessToken = req.headers['autorization'] || req.query.accessToken;
    if (!accessToken) res.send('Access denied') //sino hay token no hay acceso

    jwt.verify(accessToken, process.env.SECRET, (err, user) =>{         //usamos .verify para verificar si el token es el correcto
        if(err){
            res.send('Access denied Token incorrect or expire ')
        }else {
            res.user = user;
            next()          //si funciona el token llama a la sig funcion, next.
        }
    });
}


// Servidor onLine ---
app.listen(3001, ()=>{
    console.log("Listen to 3001");
})

