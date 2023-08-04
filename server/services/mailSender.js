import { config } from 'dotenv';
import nodeMailer from 'nodemailer';


class MailService {

	constructor(from, to, link) {
		this.transmitter = from;
		this.receiver = to;
		this.link = link;
		this.mailer = nodeMailer.createTransport({
			host: "smtp.spaceweb.ru",
			port: 25,
			secure: false,
			auth: { user: "admin@lexun.ru", pass: "GavaNA121xsd" }
		});
	}

	async pingMail() {
		await this.mailer.verify((err, success) => {
			if (err) {
				console.log("Error: ", err);
			} else {
				console.log("Server is OK.");
			}
		})
	}

	async sendMail() {
		const { LOCAL_ADDRESS } = config().parsed;
		await this.mailer.sendMail({
			from: `CRASH <${this.transmitter}>`,
			to: this.receiver,
			text: "",
			html: `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Document</title>
				</head>
				<body>
					<a href="${LOCAL_ADDRESS}/user/activate/${this.link}">${LOCAL_ADDRESS}/user/activate/${this.link}</a>
				</body>
				</html>
			`
		}, (err, info) => {
			if (err) console.log("Error: ", err);
			console.log("Letter succefully sent");
		});
	}
}

export default MailService;