import * as bcrypt from 'bcrypt-nodejs'
import * as mongoose from 'mongoose'

// ----------------------------------------------------------------------------
// TypeScript Defs ------------------------------------------------------------
// ----------------------------------------------------------------------------
enum Role {
	Admin = 'ADMIN',
	User = 'USER'
}

export type UserDocument = mongoose.Document & {
	email: string;
	password: string;
	role: Role;
	allowEmails: boolean;
	emailVerified: boolean;
	emailVerifyToken: string;
	passwordResetToken: string;
	comparePassword: comparePasswordFunction;
}

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void

export interface AuthToken {
	accessToken: string
	kind: string
}

// ----------------------------------------------------------------------------
// Mongoose Defs --------------------------------------------------------------
// ----------------------------------------------------------------------------
const userSchema = new mongoose.Schema({
	email: { type: String, unique: true },
	password: String,
	passwordResetToken: String,
	emailVerifyToken: String,
	allowEmails: {
		type: Boolean,
		default: true
	},
	emailVerified: {
		type: Boolean,
		default: false
	},
	role: {
		type: String,
		enum: [ Role.Admin, Role.User ],
		default: Role.User
	}},
	{ timestamps: true }
)

userSchema.pre('save', function save(next) {

	const user = this as UserDocument

	if (!user.isModified('password')) { return next() }

	bcrypt.genSalt(10, (err, salt) => {

		if (err) { return next(err) }

		bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {

			if (err) { return next(err) }

			user.password = hash

			next()

		})
	})
})

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {

	bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {

		cb(err, isMatch)

	})
}

userSchema.methods.comparePassword = comparePassword

export const User = mongoose.model<UserDocument>('User', userSchema)
