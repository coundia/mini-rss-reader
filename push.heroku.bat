@echo off

 git add .
"deploy to heroku ${date} "
SET message=Deploy to heroku at %date%
 git commit -m "deploy to heroku a  "
 git push heroku main:main

echo %message%
