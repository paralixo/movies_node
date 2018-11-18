
# Search Movies

Langage : NodeJS 
Date : 18/11/2018
Développeurs : Clément MEHAYE & Florian LAFUENTE
Notre projet utilise une **API** d'un site internet qui regroupe des information sur les films et les séries TV ainsi que les acteurs et les réalisateurs. 
Lien vers le site: [https://www.themoviedb.org/](https://www.themoviedb.org/ "https://www.themoviedb.org/")

 ## Installation

    npm install -g
   Ne pas oublier de download les modules `axios`, `inquirer`, `commander`, `image-downloader` !

## Commande et ses options :


 `movie -s` : Permet d'avoir des informations sur un film trouvé avec un mot-clé. Dans un premier temps il demande le mot-clé puis une année de production (optionnel) on envoie une requête à l'API. On peut sélectionner le film voulu parmi les résultats de la requête. Des informations relatives au film sélectionné s'affichent. L'utilisateur peut ensuite télécharger l'affiche du film. 
 
 `movie -n`: Affiche tout les films actuellement au cinéma. On peut en sélectionner un pour avoir plus 						d'informations. L'utilisateur peut ensuite télécharger l'affiche du film. 

`movie -i [id]`: On rentre l'id du film voulu, nous renvoie des informations détaillées de celui-ci. 

`movie -a`: On rentre le nom ou une partie du nom d'un acteur et on affiche une liste d'acteur en rapport avec la requête on en choisit un et on affiche des informations relatives à ce dernier. 

## Version 

   `movie -V` : Permet de connaitre la version du script. 

## Aide
    
`movie -h` : Affiche les différentes commandes ainsi que leurs descriptions.

En cas de problèmes veuillez nous contacter aux adresses suivantes :
* clement.mehaye@ynov.com
* florian.lafuente@ynov.com

 




