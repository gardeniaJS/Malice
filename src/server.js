const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const jwtSecret = 'EFG-AALF-AWCTBS-UTEOD-AEBT';
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/user.model');
const userRoutes = require('./routes/user');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/maliceMizerWS', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use('/api/user', userRoutes);
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
  
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));
  
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
  };
  
  passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
    return done(null, payload.user);
  }));
  router.post('R-C', async (req, res) => {

    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne ({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered.' });
      }
      const newUser = new User({ email, password });
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id, email: newUser.email}, 'your_secret_key', {expiresIn: '1h'});
    
      res.status(201).json({ message: 'User registered succesfully.', token });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error.'});
    }
  });
  router.post('L-C', passport.authenticate('local', { session: false }), (req, res) => {
    const token = jwt.sign({ user: req.user }, jwtSecret, { expiresIn: '1h' });
    res.json ({ token });
})

module.exports = router;