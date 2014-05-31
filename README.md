# Foundation Compass Template

This is a simple html - js - css viewer for json data scraped with iCoolScrap

Main files are:
  * index.html - the main html file. Defines some layout and the template to be used for each prey
  * js/icoolscrap.js - all the custom js is here. Actually, a single call to the jquery plugin jquery.icoolscrap.js
  * js/jquery.icoolscrap.js - does the dirty work; gets and parses the json file
  * scss/icoolscrap.scss - a sass file defining the look. Uses foundation, and actually generates way to much css that could be avoided
  * scss/mixins.scss - some useful mixins; in a separate file to keep things tidy
  * icoolhunt.json - a test scraped file

The vast majority of the other files are from nodejs's npm and bower dependencies and foundation, and are used just to compile the scss files.

##Usage
just fire a webserver and reach index.html. Everything should work just fine accessing the website from the filesystem too.
## Notes

I am using sass + foundation; this means css files are compiled into one file (app.css) from multiple scss sources; you need to install the requirements in order to be able to compile new css.



## Requirements
This project inherits Foundation's requirement:
  * Ruby 1.9+
  * [Node.js](http://nodejs.org)
  * [compass](http://compass-style.org/): `gem install compass`
  * [bower](http://bower.io): `npm install bower -g`

## Quickstart

  * [Download this starter compass project and unzip it](https://github.com/zurb/foundation-compass-template/archive/master.zip)
  * Run `bower install` to install the latest version of Foundation
  
Then when you're working on your project, just run the following command:

```bash
grunt watch
```
