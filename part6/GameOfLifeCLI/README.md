# CLI game of life 

An empty project with JavaScript testing tools preconfigured. Do whatever you like with it.

## Prerequisites

You'll need a recent [Node.js](https://nodejs.org/) version. Then download this project's dependencies with:

    npm install

## How to run

Example command to use from project root:

    node src/cliApp.mjs -t -it 30 -gs 30 -f /eater.rle


where
- ´-t´ = test, if used, uses the files from ´patterns´ folder
- ´-it´ = iterations followed by amount
- ´-f´ = file, followed by file path. If used togethor with -t flag, use files u can find from ´patterns´ folder. Otherwise provide full file path
- ´-gs´ = gridSize. if not used, default 30

Console print:

    2o2b$obob$2bob$2b2o!

Other examples of commands:

    node src/cliApp.mjs -t -it 20 -f /glider.rle

    node src/cliApp.mjs -t -it 3 -gs 50 -f /herschel.rle

    node src/cliApp.mjs -t -it 12 -gs 50 -f /block.rle


## Developing

Run tests once

    npm run test

Run tests continuously

    npm run autotest

Code reformat

    npm run format
