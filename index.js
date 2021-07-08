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

require('./models/User');
require('./services/passport');
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000;
