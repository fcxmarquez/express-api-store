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

  async forgetPassword(token, newPassword) {
    try {
      const { sub } = jwt.verify(token, config.jwtRecoverySecret);
      const user = await service.findOne(sub);
      if (!user) throw boom.unauthorized();
      if (!user.recoveryToken || user.recoveryToken !== token) throw boom.unauthorized();

      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { password: hash, recoveryToken: null });

      return { message: "Password changed" };
    } catch (error) {
      if (
        error instanceof jwt.JsonWebTokenError ||
        error instanceof jwt.TokenExpiredError
      ) {
        throw boom.unauthorized();
      }
      throw error;
    }
  }

  async sendRecoveryEmail(email) {
    const errorMessage = "If the email exists, a recovery email will be sent";
    try {
      const user = await service.findByEmail(email);

      const payload = { sub: user.id };
      const token = jwt.sign(payload, config.jwtRecoverySecret, {
        expiresIn: "15min",
      });
      const link = `http://myfrontend.com/recovery?token=${token}`;
      // The flow of the recovery is:
      // 1. User fill the form with the email and the new password
      // 2. User click the link and the frontend send the new password and the token to the backend
      // 3. The backend receive the new password and the token, the backend check if the token is valid
      // 4. If the token is valid, the backend update the password

      await service.update(user.id, { recoveryToken: token });

      await this.resend.emails.send({
        from: "Your App <onboarding@resend.dev>",
        to: email,
        subject: "Recovery user email",
        html: `<b>Go to this link to recovery your password: ${link}</b>`,
      });

      return { message: errorMessage };
    } catch (error) {
      return { message: errorMessage };
    }
  }

  async sendEmail(infoMail) {
    const user = await service.findByEmail(infoMail.email);
    if (!user) throw boom.unauthorized();

    const { data, error } = await this.resend.emails.send(infoMail);

    if (error) throw boom.internal("Error sending email");

    return { message: "Email sent", id: data.id };
  }
}

module.exports = AuthService;
