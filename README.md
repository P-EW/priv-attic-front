# Priv'Attic : Front-End

⚠️ | This application is unsecure, deploy at your own risks.
:---: | :---

## Priv'Attic

Priv'Attic est un réseau social permettant de partager un peu de texte ou des images.
Réalisé en 5 jours dans le cadre de l'UE "Nouvelles technologies du web" par :
- Ambrozik Hugo
- Watelot Paul-Emile



Les fonctionnalités du site sont les suivantes:
- Créer un Compte
- Se connecter
- Modifier son Compte
- Supprimer son Compte
- Mettre son compte en public ou privé


- Créer un Post
- Supprimer un Post
- Aimer un post
- Partager un Post


- Créer un Commentaire
- Supprimer un Commentaire

- Accéder à la page de profil d'un Utilisateur
- Lister les Posts d'un Utilisateur
- Lister les Posts aimés d'un Utilisateur
- Lister les commentaires d'un utilisateur
- Explorer les posts publics par :
  - mots clefs
  - tag

L'application utilise des Tokens JWT pour l'authentification.

## Installation du projet
- Télécharger, installer et lancer la partie [back end](https://github.com/P-EW/priv-attic-back)
- Télécharger, installer et lancer la partie [front end](https://github.com/P-EW/priv-attic-front) (ici)

## Dépendances :

```bash
     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/


Angular CLI: 13.0.3
Node: 16.10.0
Package Manager: yarn 1.22.17
OS: win32 x64

Angular: 13.0.2
... animations, cdk, common, compiler, compiler-cli, core, forms
... material, platform-browser, platform-browser-dynamic, router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1300.3
@angular-devkit/build-angular   13.0.3
@angular-devkit/core            13.0.3
@angular-devkit/schematics      13.0.3
@angular/cli                    13.0.3
@schematics/angular             13.0.3
rxjs                            7.4.0
typescript                      4.4.4
```

## Installation
```bash
# Clonage du git en repo local
$ git clone https://github.com/P-EW/priv-attic-front
# Se rendre dans le dossier du projet
$ cd priv-attic-front
# installation des dependances au choix :
$ npm install
# OU
$ yarn install
# Lancer le projet
$ ng serve
```
Le projet est accessible à l'adresse suivante : [http://localhost:4200/](http://localhost:4200/)
