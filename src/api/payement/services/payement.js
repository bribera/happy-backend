// 'use strict';

// /**
//  * payement service
//  */

// const { createCoreService } = require('@strapi/strapi').factories;

// module.exports = createCoreService('api::payement.payement');
'use strict';
const axios = require('axios');
const { v4: uuid } = require('uuid');

module.exports = ({ strapi }) => ({
  /**
   * Envoie une requête de paiement vers MTN MoMo ou Moov Money
   */
  async sendMobilePayment({ provider, amount, phone, txId }) {
    if (provider === 'MTN') {
      return this._sendMtn({ amount, phone, txId });
    }

    if (provider === 'MOOV') {
      return this._sendMoov({ amount, phone, txId });
    }

    throw new Error(`Unsupported payment provider: ${provider}`);
  },

  // --- MTN MoMo ---
  async _sendMtn({ amount, phone, txId }) {
    const MTN = {
      base: process.env.MTN_MOMO_BASE,
      targetEnv: process.env.MTN_TARGET_ENV,
      apiUser: process.env.MTN_API_USER,
      apiKey: process.env.MTN_API_KEY,
      subscriptionKey: process.env.MTN_SUB_KEY,
    };

    // 1. Obtenir le token OAuth2
    const tokenRes = await axios.post(
      `${MTN.base}/collection/token/`,
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${MTN.apiUser}:${MTN.apiKey}`).toString('base64')}`,
          'Ocp-Apim-Subscription-Key': MTN.subscriptionKey,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenRes.data.access_token;

    // 2. Créer une transaction avec UUID
    const referenceId = uuid();

    await axios.post(
      `${MTN.base}/collection/v1_0/requesttopay`,
      {
        amount: amount.toString(),
        currency: 'XOF',
        externalId: txId,
        payer: {
          partyIdType: 'MSISDN',
          partyId: phone,
        },
        payerMessage: 'Training center tuition',
        payeeNote: 'Thanks for your payment',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Reference-Id': referenceId,
          'X-Target-Environment': MTN.targetEnv,
          'Ocp-Apim-Subscription-Key': MTN.subscriptionKey,
          'Content-Type': 'application/json',
        },
      }
    );

    return { referenceId };
  },

  // --- Moov Money (via agrégateur comme FeexPay) ---
  async _sendMoov({ amount, phone, txId }) {
    const MOOV = {
      base: process.env.MOOV_BASE,
      shop: process.env.MOOV_SHOP_ID,
      secret: process.env.MOOV_SECRET,
    };

    const res = await axios.post(
      `${MOOV.base}/checkout/payment`,
      {
        phoneNumber: phone,
        amount,
        shop: MOOV.shop,
        description: `Training payment ${txId}`,
      },
      {
        headers: {
          'x-api-key': MOOV.secret,
        },
      }
    );

    return {
      redirectUrl: res.data?.payment_url,
    };
  },
});

