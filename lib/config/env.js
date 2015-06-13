var env = process.env
var environment = {
  protocol: env.PROTOCOL,
  host: env.HOST,
  port: env.PORT,
  dbURI: env.DB_URI,
  organizationName: env.ORGANIZATION_NAME,
  facebook: {
    appID: env.FACEBOOK_APP_ID,
    appSecret: env.FACEBOOK_APP_SECRET
  }
}

export default environment
