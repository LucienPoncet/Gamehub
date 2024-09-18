//On appelle express
const express = require('express');
const app = express();

//On appelle ejs
app.set('view engine', 'ejs');
app.set('views', './views');

//On lie notre fichier css qui se trouve dans le gros dossier public
app.use(express.static("public"));


//On importe le fichier games.json dans une variable
const jsonData = require('./games.json');

//Mise en place des locals qui se trouveront dans toute les vues (plus besoin d'appeler jsonData)
app.locals.gamesData = jsonData;



//On implémente un middleware chargé de journaliser la date de la requete, l'IP du client et le chemin accédé
//La condition if empêche la favicon de renvoyer une deuxième ligne d'infos
const infos = function (req, res, next) {
    if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end();
        return;
    }

    const date = Date();
    console.log(date);

    const ipClient = req.socket.remoteAddress;
    console.log(ipClient);

    const path = req.originalUrl;
    console.log(path);
    
    next()

}


app.use(infos)




//Mise en place de la page d'accueil
app.get('/', (req, res) => {
    res.render('index', {data:{}})
});


app.get('/game/:nomDuJeu', (req, res) => {

    //On définit les req.params. en cherchant le nom du jeu qui doit se trouver dans le tableau du fichier games.json (passé dans la variable jsonData)
    const game = jsonData.find((game) => game.name === req.params.nomDuJeu)

    //Si game (le nom du jeu tapé dans l'url après /game/) existe dans la sous-partie "name" de chaque objet du tableau jsonData:
    //on envoie une page ejs correspondante au nom du jeu récupéré
    //Si game n'existe pas, on envoie une page 404 (personnalisé pour un jeu non existant)

    if (game) {
        res.render(`${game.name}`, {data:{game}})
    } else {
        res.render('404game')
    }

});

//Page 404 classique
app.use((req, res) => {
    res.render('404');
});


//Mise en place et lancement du serveur
app.listen(3000, () => {
    console.log("listening on http://localhost:3000");
})