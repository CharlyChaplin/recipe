import { config } from 'dotenv';
import nodeMailer from 'nodemailer';


class MailService {

	constructor(from, to, link) {
		const {
			EMAIL_HOST,
			EMAIL_PORT,
			EMAIL_SENDER,
			EMAIL_PASSWORD
		} = config().parsed;

		this.transmitter = from;
		this.receiver = to;
		this.link = link;
		this.mailer = nodeMailer.createTransport({
			host: EMAIL_HOST,
			port: EMAIL_PORT,
			secure: false,
			auth: {
				user: EMAIL_SENDER,
				pass: EMAIL_PASSWORD
			}
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
			from: `recipe_confirmation <${this.transmitter}>`,
			to: this.receiver,
			text: "",
			html: `
				<!DOCTYPE html>
				<html lang="ru">
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