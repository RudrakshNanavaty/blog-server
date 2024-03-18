import jwt from 'jsonwebtoken'

class TokenHandler {
	constructor(userDB) {
		this.userDB = userDB
	}

	// Middleware to verify JWT token and authenticate user
	verifyToken = async (req, res, next) => {
		// Decode the JWT token from request headers
		const decodedToken = decodeToken(req.headers)

		if (!decodedToken) res.status(401).json('Unauthorized')

		const tokenUserID = decodedToken.id

		req.user.id = tokenUserID
		next()
	}
}

// Function to decode JWT token from request headers
function decodeToken(headers) {
	const authHeader = headers['authorization']

	if (!authHeader) return false

	const token = authHeader.split(' ')[1]

	try {
		const tokenDecoded = jwt.decode(token)
		return tokenDecoded
	} catch {
		return false
	}
}

export default TokenHandler
