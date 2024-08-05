const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const UserService = require("./user.service");
const { config } = require("../config/config");

const service = new UserService();

class AuthService {
  constructor() {}

  async getUser(email, password) {
    const user = await service.findByEmail(email);

    if (!user) throw boom.unauthorized();

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw boom.unauthorized();

    delete user.dataValues.password;

    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
      customerId: user.customer ? user.customer.id : null,
    };
    const token = jwt.sign(payload, config.jwtSecret);

    return { payload, token };
  }

  async sendEmail(email) {
    const user = await service.findByEmail(email);
    if (!user) throw boom.unauthorized();

    // Create a test account
    const testAccount = await nodemailer.createTestAccount();

    // Create a transporter using the test account
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"Your Name" <${testAccount.user}>`, // sender address
      to: email, // list of receivers
      subject: "Recovery Email", // Subject line
      text: "Recovery Email", // plain text body
      html: "<b>Recovery Email Test</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return { message: "Email sent", previewUrl: nodemailer.getTestMessageUrl(info) };
  }
}

module.exports = AuthService;
