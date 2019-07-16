![Screenshot](https://i.ibb.co/K7QfFn5/screenshot.png)
# A Custom New Tab Page
This is my custom new tab page for chrome because I felt the default one was not very appealing and I wouldn't take the trouble to customize it with an extension like [Momentum](https://is.gd/rd8png). So I decided to make my own.

It has a list of bookmarks, a quote and a searchbar. It also has a list of youtube channels from which the button links to the most recent video. Most of it is customizable through the css or the js. You can change the bookmark list, the regular button, the youtube list and the quote source.

## Installation
**These install instuctions are for chrome and chromium based browsers as firefox recent dropped support for custom new tab pages. [See More](https://www.reddit.com/r/firefox/comments/9v1207/bring_back_custom_new_tab_url/)**
1) Install [This](https://chrome.google.com/webstore/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia?hl=en) Extension

2) Download This Repository

3) Click [this](chrome-extension://mmjbdbjnoablegbkcklggeknkfcjkjia/options.html) link and set the file path to the index.html in this repo and save.

## Customization
To customize your newly-installed new tab page you will need to have some basic knowledge of javascript, css & json. [FreeCodeCamp](https://www.freecodecamp.org/) and [MDN](https://developer.mozilla.org/en-US/) can help.

1) Open a terminal and navigate to where you saved the repo.

2) Run `npm install` and after that `npx webpack --watch`. These commands will require [Node JS](https://nodejs.org/en/) to be installed. If don't want to bother with webpack and node js, simply change the script tag in the html file to point to `app.js` and at the end of the body tag import `https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js` and `https://cdn.jsdelivr.net/npm/shave@2.5.4/dist/shave.min.js`. **Comment out the first 2 lines in app.js**

3) Open `app.js` in your text editor of choice. (Mine is [VSCODE](https://code.visualstudio.com/))

4) a) To change quote source (API) simply modify the `Quote` function's fetch url to your choice and change its callback to work with your new source (API).

   b) To change the wallpaper, open `app.css` and replace `background` property in the `body,html` selector. (Dont forget to minify and replace `app.min.css`)

   c) To change the bookmarks bar simply, modify the `lists` array in the `Links` function to include whatever sites you want. The `nm` property will be rendered as the name of the button, the `url` indicates what to open on click, `img` is the class of the [font-awesome](https://fontawesome.com/) icon you want to display and `color` is the color of this icon.

   d) Similarly to change the youtube channels, change the `channels` array in the `Youtube` function. `id` is the channel id, `element` is the html element to link and `store` is the name of the object containing the information about a single channel when it is stored in `localStorage`

   e) To modify the `Regular` button change the event listener callback in the `Buttons` function.

**Note**: Both `Quote` and `Youtube` on 1st run store their info in `localStorage` along with its date. On subsequent runs it checks the date stored in `localStorage`, If it is the same it reuses the stored data. Change your Youtube API Key in the `Youtube` function's fetch url.