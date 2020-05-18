# Image resize service

## Description

This is a tiny service with one route only. The route accepts either an image URL in the body or an image binary resizes it to your choice and rotates it based on the exif info.

This service was created using Express and Sharp as Sharp has great performance in image manipulation.

## Installation
To install the service, follow these steps:
	
 1. Run `npm install` and everything should be installed for you.

## Usage

 1. To run in a production enviroment, run 'npm start'
 2. To run in a development enviroment, run 'npm run dev'

## Test

To run tests, run `npm test` 
