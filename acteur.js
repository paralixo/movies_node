#!/usr/bin/env node

const axios = require('axios')
const inquirer = require('inquirer')
const program = require('commander')
// Configuration des paramètres attendus
program
    .version('1.0.0')
    .option('-a, --actor [id]', 'Show description of the actor')
// On parse (convertit en format utilisable) les options
// fonction synchrone
program.parse(process.argv)

const api_key = '67a60f5c4a8f8a4e7d91c910ea93aced'
const language = 'fr-FR'

// Maintenant on peut les utiliser
if (program.actor){
   
    inquirer.prompt([
        {
            type: 'input',
            message: 'Entrez le nom de l\'acteur ou de l\'actrice',
            name: 'actorname'
         }
        ]).then((answers) => {
            const link = "https://api.themoviedb.org/3/person/popular?api_key="+api_key+'&query='+answers['actorname']+
            axios.get(link)
        })
        
    }

