const axios = require("axios");
module.exports = {
  async init({ amount, phone, txId }) {
    const res = await axios.post(process.env.MTN_MOMO_URL, {
      amount, currency: "XOF", externalId: txId, payer: { partyIdType: "MSISDN", partyId: phone },
    }, {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.MTN_SUB_KEY,
        "X-Reference-Id": txId,
        "X-Target-Environment": "mtnbenin",
        "Content-Type": "application/json",
      },
    });
    return res.status === 202;
  },
};
