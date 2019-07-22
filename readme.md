![Screenshot](https://i.ibb.co/S6Wc2Y7/Awesome-Screenshot-Homepage-2019-07-21-11-07-77.png)
# Custom New Tab
This is a custom new tab for my browser that I created after begin inspired by a post I saw on the [r/firefoxCSS](reddit.com/r/firefoxCSS) subreddit. Here's what it features: <br />
* A customizable Bookmark list
* A Quote of the day from [this](https://theysaidso.com/api/) api
* A Tasklist
* A Searchbar and clock
* A List of youtube channels linking to their newest videos using the [youtube api](https://developers.google.com/youtube/v3/).

## Installation
This is going to be a long install process, so buckle up. This guide assumes basic knowledge of javascript and json. If not google can help.

* Download this repository

* Install `FiraCode-Regular.ttf` after unzipping the file. ( This installs [Fira Code](https://github.com/tonsky/FiraCode) which is necessary. )

* Run the command `npm run startup` in your respective cmd after installing [Node.js](https://nodejs.org/en/) and running `npm install`. (This will install all the required packages and run webpack)

* Write `options.js`: Create a file in the repo and name it `options.js`. You will need create a file similar to [this](http://pasted.co/7d3a575b) example with your own preferences.

* Install [this](https://chrome.google.com/webstore/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia?hl=en) chrome extension, open its options and set the new tab url to the `index.html` file in this repo.

* Open a new tab and press `Ctrl+Shift+J` or open the console and type `Startup()`