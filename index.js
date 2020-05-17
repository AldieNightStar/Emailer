const nodemailer = require('nodemailer');
const ejs = require("ejs");
const fs = require("fs");

/**
Usage:
	// Import
	// Setting up "gmail" as service and credentials
	// To make it work, you need to turn on "Less Secure app access" in your GOOGLE ACC
	const emailer = require("Emailer")("user@gmail.com", "PASS123")
	
	// Send some message to "someone@gmail.com"
	let status = await emailer.send("someone@gmail.com", "Hello!", "Hello there!");

	// Send some ejs-based HTML message to "someone@gmail.com"
	let status = await emailer.sendHtml(
		"someone@gmail.com",
		"Message Title",
		await emailer.FILE(__dirname + "./template.html"),
		{age: 18}
	);
*/

let myEmail = null;
let transporter = null;

function authorize(email, pass) {
	myEmail = email;
	transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: email,
			pass: pass
	  	}
	});
	return {send, sendHtml, FILE}
}

function send(to, subject, text, isHtml = false) {
	return new Promise((ok, err) => {
		// Workaround: Add "@gmail.com" to avoid SPAM content
		myEmail += "@gmail.com"
		
		const mailOptions = {
			from: myEmail,
			to: to,
			subject: subject,
			text: text
		};
		if (isHtml) {
			mailOptions.html = mailOptions.text;
			mailOptions.text = "";
		}
		transporter.sendMail(mailOptions, function(error, info){
		  	if (error) {
				err(error);
			} else {
				ok(info);
			}
		});
	});
}

function sendHtml(to, subject, htmlText, viewObject) {
	const resultText = ejs.render(htmlText, viewObject);
	return send(to, subject, resultText, true);
}

function FILE(filename) {
	return new Promise((ok, err) => {
		fs.readFile(filename, (error, data) => {
			if (error) {
				err(error);
			} else {
				const d = data.toString("utf8");
				ok(d);
			}
		});
	});
}

module.exports = authorize;


