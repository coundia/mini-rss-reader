# Etape Development

- generer les differents  modules

  - `ng g m app-routing --flat --module=app`
  - `ng g m core`
  - `ng g m flux-rss`

- generer les differents  modules compenents 

  - `ng g c flux-rss/item`


- Creer les differents  modeles 

- Service lecture flux 

- `ng g s core/services/flux-rss-reader`
- `npm install --save xml2js`

#Installer materials angular

- ng add @angular/material


#Delpoyer dans heroku 
- npm install express path --save
- Modifier package.json
- "start" : "node server.js"   
- "engines": { "node": "14.19.0", "npm": "6.14.16" }
  
- git add .
- git commit -m " deploy to heroku config "
- git push heroku main

## Lier a heroku 
 
- heroku git:remote -a mini-rss-reader
- git push heroku main 
# add Pwa

- ng add @angular/pwa  --project  mini-rss-reader


# Fix issue : 2-pb-responsive-on-mobile
git fetch origin
git checkout 2-pb-responsive-on-mobile

# Heroku fix CI/CD github issue

https://help.heroku.com/CKVOUPSY/how-to-switch-deployment-method-from-github-to-heroku-git-with-all-the-changes-app-code-available-in-a-github-repo
git pull origin
git checkout main
heroku git:remote -a mini-rss-reader
git push heroku main:main
