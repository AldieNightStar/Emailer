# Install
```sh
npm install AldieNightStar/Emailer
```

# Setup Google Account
* Go to `Security Settings`
* Turn ON `Less secure app` or something similar
* Save your login and password to use in this app

# Import
```js
// Do not add "@gmail.com".
const emailer = require("Emailer")("user.name, "password123");
```

# Usage
### Send Simple message
```js
// Send some message to "someone@gmail.com"
// 	send(To, Subject, TEXT)
let status = await emailer.send("someone@gmail.com", "Hello!", "Hello there!");
```

### Send HTML
```js
// Load HTML EJS Template
// __dirname - Directory where script runs
let TEMPLATE = await emailer.FILE(__dirname + "/HTML/somePage.htm");

// Send email
//	sendHtml(To, Subject, HTML_TEMPLATE, TEMPLATE_DATA)
let info = await emailer.sendHtml("ihor.fox@gmail.com", "Your plan had started!", TEMPLATE, {
	userName: "Ihor-Haxi-Denti FOX",
	avg_compiance: 32,
	avg_quality: 12
});
```
