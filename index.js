const express = require('express');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const keys = require('./config/keys');

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.sessionSecret],
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  keys.mongoDBURI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
  }
);

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static(path.join(__dirname, 'client/dist')));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

require('./models/User');
require('./services/passport');
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000;
