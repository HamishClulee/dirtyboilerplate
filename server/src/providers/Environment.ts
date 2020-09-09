import * as path from 'path'
import * as dotenv from 'dotenv'

class Env {

	public static get(): any {
		dotenv.config({ path: path.join(__dirname, '../../.env') })

		const env = process.env.NODE_ENV
		const prodUrl = process.env.PROD_URL
		const devUrl = process.env.DEV_URL
		const devPubUrl = process.env.DEV_PUB_URL

		const baseUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl
		const port = process.env.PORT || 1980
		const appSecret = process.env.APP_SECRET || 'This is your responsibility!'
		const mongooseUrl = process.env.MONGOOSE_URL

		const internalEmail = process.env.INTERNAL_EMAIL

		const googleClientId = process.env.GOOGLE_ID
		const googleSecret = process.env.GOOGLE_SECRET
		const tokenSecret = process.env.TOKEN_SECRET
		const sendGridSecret = process.env.SENDGRID_API_KEY

		const name = process.env.APP_NAME || 'Welcome QR Codes'
		const keywords = process.env.APP_KEYWORDS || 'somethings'
		const year = (new Date()).getFullYear()
		const copyright = `Copyright ${year} ${name} | All Rights Reserved`
		const company = process.env.COMPANY_NAME || 'Welcome QR Codes'
		const description = process.env.APP_DESCRIPTION || 'Here goes the app description'

		const logDays = process.env.LOG_DAYS || 10

		const queueMonitor = process.env.QUEUE_HTTP_ENABLED || true
		const queueMonitorHttpPort = process.env.QUEUE_HTTP_PORT || 5550

		const redisHttpPort = process.env.REDIS_QUEUE_PORT || 6379
		const redisHttpHost = process.env.REDIS_QUEUE_HOST || '127.0.0.1'
		const redisPrefix = process.env.REDIS_QUEUE_DB || 'q'
		const redisDB = process.env.REDIS_QUEUE_PREFIX || 3

		return {
			internalEmail,
			baseUrl,
			devPubUrl,
			sendGridSecret,
			googleClientId,
			googleSecret,
			env,
			appSecret,
			tokenSecret,
			company,
			copyright,
			description,
			keywords,
			logDays,
			mongooseUrl,
			name,
			port,
			redisDB,
			redisHttpPort,
			redisHttpHost,
			redisPrefix,
			prodUrl,
			devUrl,
			queueMonitor,
			queueMonitorHttpPort
		}
	}
}

export default Env
