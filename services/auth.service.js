const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");
const UserService = require("./user.service");
const { config } = require("../config/config");

const service = new UserService();

class AuthService {
  constructor() {
    this.resend = new Resend(config.resendApiKey);
  }

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

    const { data, error } = await this.resend.emails.send({
      from: "Your App <onboarding@resend.dev>",
      to: email,
      subject: "Recovery Email",
      html: "<b>Recovery Email Test</b>",
    });

    if (error) throw boom.internal("Error sending email");

    console.log("Email sent:", data);
    return { message: "Email sent", id: data.id };
  }
}

module.exports = AuthService;
