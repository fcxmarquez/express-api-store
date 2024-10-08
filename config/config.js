require("dotenv").config();
// dotenv is a module that allows us to use environment variables

const config = {
  env: process.env.NODE_ENV || "development", // process is like window in browser
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  jwtRecoverySecret: process.env.JWT_RECOVERY_SECRET,
  smtpEmailPass: process.env.SMTP_EMAIL_PASS,
};

module.exports = { config };
