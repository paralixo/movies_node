#!/usr/bin/env node

const axios = require('axios')
const inquirer = require('inquirer')
const program = require('commander')
const download = require('image-downloader')
// Configuration des paramètres attendus
program
    .version('1.0.0')
    .option('-s, --search', 'Search a movie by name and show some informations')
    .option('-n, --now', 'Get now playing movies')
    .option('-i, --info [id]', 'Get detailed informations from a movie id')
    .option('-a, --actor', 'Show description of the actor')
// On parse (convertit en format utilisable) les options
// fonction synchrone
program.parse(process.argv)

const api_key = '67a60f5c4a8f8a4e7d91c910ea93aced'
const language = 'fr-FR'

function download_img(img, movie_name) {
    
    inquirer.prompt([
    {
        type: 'confirm',
        message: 'Voulez-vous sauvegarder le poster du film ?',
        name: 'save'
    }
        
    ]).then((answers) => { 
        if (answers['save'] == true) {
            options = {
              url: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + img,
              dest: './posters/' + movie_name  + '.jpg'      
            }

            download.image(options)
              .then(({ filename, image }) => {
                console.log('Img saved to', filename)
              })
              .catch((err) => {
                console.error(err)
              })
        }
    })
    
    
}

if (program.search) {
    let link = 'https://api.themoviedb.org/3/search/movie?api_key=' + api_key + '&language=' + language
    
    inquirer.prompt([
    {
        type: 'input',
        message: 'Entrez votre mot clé: ',
        name: 'query'
    }, {
        type: 'input',
        message: 'Entrez l\'année du film: ',
        name: 'year'
    } 
        
    ]).then((answers) => {
        // Personnalise le lien
        for(let parameter in answers) {
            if (answers[parameter] != '') {
                link += '&' + parameter + '=' +answers[parameter]
            }
        }
        
        // Requête API
        axios.get(link)
        .then(function (response) {
            list = []
            for (result of response.data.results) {
                list.push(result['title'] + " | " + result['release_date'] + " | " + result['overview'].substr(0, 100) + "...")
            }
            
            inquirer.prompt([
            {
                type: 'rawlist',
                message: 'Quel film souhaitez-vous visualiser ? (' + list.length + ' résultats)',
                name: 'film',
                choices: list
            }
            ]).then((answers) => {
                answers = answers['film']
                nom = answers.substr(0, answers.indexOf("|")-1)
                annee = answers.substr(answers.indexOf("|")+2, 10)
                img_name = ''
                for (result of response.data.results) {
                    if (result['title'] == nom && result['release_date'] == annee) {
                        console.log(result)
                        img_name = result['poster_path']
                    }
                }
                
                download_img(img_name, nom)
            })
            
        })
        .catch(function (error) {
            console.log(error)
        })
    })
    
} else if (program.now) {
    let link = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + api_key + '&language=' + language
    
    axios.get(link)
        .then(function (response) {
            list = []
            for (result of response.data.results) {
                list.push(result['title'] + " | " + result['release_date'] + " | " + result['overview'].substr(0, 100) + "...")
            }
        
            inquirer.prompt([
            {
                type: 'rawlist',
                message: 'Quel film souhaitez-vous visualiser ? (' + list.length + ' résultats)',
                name: 'film',
                choices: list
            }
            ]).then((answers) => {
                answers = answers['film']
                nom = answers.substr(0, answers.indexOf("|")-1)
                annee = answers.substr(answers.indexOf("|")+2, 10)
                for (result of response.data.results) {
                    if (result['title'] == nom && result['release_date'] == annee) {
                        console.log(result)
                        img_name = result['poster_path']
                    }
                }
                
                download_img(img_name, nom)
            })
        })
        .catch(function (error) {
            console.log(error)
        })

} else if (program.info) {    
    let link = 'https://api.themoviedb.org/3/movie/' + program.info + '?api_key=' + api_key + '&language=' + language
    
    axios.get(link)
        .then(function (response) {
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
    
} else if (program.actor){
   
    inquirer.prompt([
        {
            type: 'input',
            message: 'Entrez le nom de l\'acteur ou de l\'actrice',
            name: 'actorname'
         }
        ]).then((answers) => {
            const link = "https://api.themoviedb.org/3/search/person?api_key="+api_key+'&query='+answers['actorname']
            axios.get(link)
            .then(function (response) {
                list=[]
                for (result of response.data.results) {
                    list.push(result['name']+" | "+result['known_for'][0]['title'])
                }
                
                inquirer.prompt([
                    {
                        type: 'rawlist',
                        message: 'Quel acteur souhaitez-vous choisir ? (' + list.length + ' résultats)',
                        name: 'film',
                        choices: list
                    }
                ]).then((answers) => {
                    answers = answers['film']
                    nom = answers.substr(0, answers.indexOf("|")-1)
                    known = answers.substr(answers.indexOf("|")+2)
                    for (result of response.data.results) {
                        if (result['name'] == nom && result['known_for'][0]['title'] == known ) {
                            console.log(result)
                        }
                    }
                })
                
            } ).catch(function (error) {console.log(error)}) 
        })
    
} else {
    program.help()
    
}
