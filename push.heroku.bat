@echo off
git add .
SET message=Deploy to heroku at  %date%
git commit -m %message%
git push heroku main:main

