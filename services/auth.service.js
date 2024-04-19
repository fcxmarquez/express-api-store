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

    const transporter = nodemailer.createTransport({
      host: "smtp.mandrillapp.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "not-defined",
        pass: config.smtpEmailPass,
      },
    });

    await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: email, // list of receivers
      subject: "Recovery Email", // Subject line
      text: "Recovery Email", // plain text body
      html: "<b>Recovery Email</b>", // html body
    });

    return { message: "Email sent" };
  }
}

module.exports = AuthService;
