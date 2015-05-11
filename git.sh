#!/bin/sh

url='git@github.com:yanxyz/sequelize-express-example.git'
if [ ! -d '.git' ]; then
  git init
  git remote add origin $url
fi

url='git@github.com:sequelize/express-example.git'
if ! git remote -v | grep -q 'upstream'; then
  git remote add upstream $url
fi

echo 'fetch upstream...'
git fetch upstream master
# git checkout master
git merge upstream/master
