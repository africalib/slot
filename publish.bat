@echo off

node publish.js

cd ../plays/slot
git add .
git commit -m 'updated'
git push

echo https://plays.africalib.org/slot