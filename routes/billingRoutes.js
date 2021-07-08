const keys = require('../config/keys');
const stripe = require('stripe')(`${keys.stripeSKey}`);
const bodyParser = require('body-parser');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.post('/api/stripe', async (req, res) => {
    const charge = await stripe.paymentIntents.create({
      amount: 500,
      currency: 'USD',
      confirm: true,
      payment_method: req.body.id,
      description: '$5 for 5 credits',
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });

  app.post('/api/create-checkout-session', requireLogin, async (req, res) => {
    const domainURL = process.env.DOMAIN;

    const price = await stripe.prices.create({
      unit_amount: 500,
      currency: 'usd',
      product_data: {
        name: 'Emaily',
        statement_descriptor: 'Emaily email services',
      },
    });

    try {
      const session = await stripe.checkout.sessions.create({
        success_url: `/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/cancel`,
        payment_method_types: ['card'],
        customer: req.user._id,
        line_items: [{ price: price.id, quantity: 1 }],
        mode: 'payment',
      });
      return res.redirect(303, session.url);
    } catch (err) {
      console.log(err);
    }

    // res.redirect('/api/current_user');
  });

  app.get('/api/hellodear', (req, res) => {
    res.locals.user = 'Dhanush';
    res.status(200).send(res.locals);
  });

  app.post(
    '/webhook',
    bodyParser.raw({ type: 'application/json' }),
    app.post(
      '/webhook',
      bodyParser.raw({ type: 'application/json' }),
      async (req, res) => {
        const event = req.body;
        let eventType;
        // Only verify the event if you have an endpoint secret defined.
        // Otherwise use the basic event deserialized with JSON.parse
        if (endpointSecret) {
          // Get the signature sent by Stripe
          const signature = req.headers['stripe-signature'];
          try {
            eventType = stripe.webhooks.constructEvent(
              req.body,
              signature,
              endpointSecret
            );
          } catch (err) {
            console.log(
              `⚠️  Webhook signature verification failed.`,
              err.message
            );
            return res.sendStatus(400);
          }
        }
        // Handle the event
        console.log(eventType.type);
        if (eventType.type === 'charge.succeeded') {
          const session = eventType.data.object;

          console.log('payment received');
          console.log('session', session);
        }
      }
    )
  );
};
