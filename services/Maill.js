const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

class Maill {
  constructor({ subject, recipients }, content) {
    this.sgMail = sgMail.setApiKey(keys.sendGridKey);
    this.from_email = 'dhanush.code1@gmail.com';
    this.subject = subject;
    this.text = 'Hello plain world';
    this.recipients = this.formatAddresses(recipients);
    this.html = content;
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return email;
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    // const request = this.sgApi.emptyRequest({
    //   method: 'POST',
    //   path: '/v3/mail/send',
    //   body: this.toJSON(),
    // });

    // const response = await this.sgApi.API(request);
    // return response;
    const msg = {
      to: this.recipients,
      from: this.from_email,
      subject: this.subject,
      text: this.text,
      html: this.html,
    };

    const res = await sgMail.sendMultiple(msg);
    return res;
  }
}

module.exports = Maill;
