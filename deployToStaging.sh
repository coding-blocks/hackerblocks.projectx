#! /bin/bash

rm -rf dist/*
ember build --env staging
chmod 600 key.pem

ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "mkdir ~/temp"
scp -o StrictHostKeyChecking=no -i key.pem -r ./dist/* $USER@$SERVER:~/temp/
ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "rm -rf ~/frontends/hackerblocks.staging/* && \
  cp -rf ~/temp/* ~/frontends/hackerblocks.staging && \
  rm -rf ~/temp"
