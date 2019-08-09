#! /bin/bash

rm -rf dist/*
ember build --env production

ssh codingblocks@srv17.cb.lk "rm -rf ~/frontends/hackerblocks/*"
scp -r ./dist/* codingblocks@srv17.cb.lk:~/frontends/hackerblocks/