const router = require('express').Router();
const bcrypt = require('bcryptjs')
const Users = require('./auth-model.js');
const authenticate = require("./authenticate-middleware.js");

// const jwt = require('jsonwebtoken')
// require("dotenv").config();


router.post('/register', async (req, res, next) => {
  try {
		const { username } = req.body;
		const user = await Users.findBy({ username }).first();

		if (user) {
			return res.status(409).json({
				message: "Username is already taken"
			});
		}
		console.log("req.body: ", req.body);

    res.status(201).json(await Users.add(req.body));
    
    // const newUser = await Users.add({
    //   username,
    //   password: await bcrypt.hash(password, 14)
    // })
    // if (newUser) {
    //   res.status(201).json({
    //     message: 'User created'
    //   })
    // }

	} catch (err) {
		next(err);
	}
});

router.post('/login', async (req, res, next) => {
  try {
		const { username, password } = req.body;
		const user = await Users.findBy({ username }).first();

		const passwordValid = await bcrypt.compare(password, user.password);
		if (!user || !passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials"
			});
		}

		req.session.user = user;
		res.json({
			message: `Welcome ${user.username}!`
    });
    
    // const token = generateToken(user)
    // res.cookie('token', token)
    // res.json({
    //   message: `hey ${username}, you are logged in, I sent your token through cookies`
    // })

	} catch (err) {
		next(err);
	}
});

// function generateToken(user) {
//   const payload = {
//     subject: user.id,
//     username: user.username
//   }

//   return jwt.sign(payload, process.env.JWT_SECRET)
// }

router.get("/logout", authenticate, async (req, res, next) => {
	req.session.destroy(err => {
		if (err) {
			next(err);
		} else {
			res.json({
				message: "Successfully logged out!"
			});
		}
	});
});


module.exports = router;
