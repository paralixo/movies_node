#!/usr/bin/env node

const axios = require('axios')
const inquirer = require('inquirer')
const program = require('commander')
// Configuration des paramètres attendus
program
    .version('1.0.0')
    .option('-w, --world', 'Show hello world')
    .option('-i, --info [name]', 'Show info of movie')
    .option('-a, --all', 'Show hello all')
    .option('-s, --someone [name]', 'Say hi to someone')
// On parse (convertit en format utilisable) les options
// fonction synchrone
program.parse(process.argv)

const api_key = '67a60f5c4a8f8a4e7d91c910ea93aced'

// Maintenant on peut les utiliser
if (program.world) {
    console.log('Hello world!')
    
    inquirer.prompt([
    {
        type: 'input',
        message: 'Entrez votre nom d\'utilisateur',
        name: 'username'
    }, {
        type: 'password',
        message: 'Entrez votre mot de passe',
        name: 'password'
    }, {
        type: 'checkbox',
        message: 'Que voulez-vous sauvegarder ?',
        name: 'foldersToSave',
        choices: [
            'Mes documents',
            'Mon bureau',
            'Ma musique'
        ]
    }
    ]).then((answers) => {
        console.log(answers)
    })
} else if (program.info) {
    let lien = ''
    
} else if (program.all) {
    console.log('Hello all!')
    
    const lien = 'https://jsonplaceholder.typicode.com/'
    let album = {}
    axios.get(lien + 'albums/1')
    .then(function (responseAlbum) {
        album = responseAlbum.data
        return responseAlbum.data.userId
    })
    .then(function (userId) {
        return axios.get(lien + 'users/' + userId)
    })
    .then(function (responseUser) {
        album['user'] = responseUser.data
        return axios.get(lien + 'photos?albumId=' + album.id)
    })
    .then(function (responsePhotos) {
        album['photos'] = responsePhotos.data
        console.log("album:",album)
    })
    .catch(function (error) {
        console.log(error)
    })

} else if (program.someone) {
    console.log(`Hello ${program.someone}!`)
} else {
    program.help()
}