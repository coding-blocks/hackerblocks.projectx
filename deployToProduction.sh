#! /bin/bash

rm -rf dist/*
ember build --env production

ssh codingblocks@srv17.cb.lk "mkdir ~/temp"
scp -r ./dist/* codingblocks@srv17.cb.lk:~/temp/
ssh codingblocks@srv17.cb.lk "rm -rf ~/frontends/hackerblocks/* && \
  cp -rf ~/temp/* ~/frontends/hackerblocks && \
  rm -rf ~/temp"