// 'use strict';

// /**
//  * payement controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::payement.payement');
'use strict';

/**
 * payement controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::payement.payement', ({ strapi }) => ({

  async initialize(ctx) {
  try {
    const { enrollmentId, method, phone } = ctx.request.body;
    const enrollment = await strapi.entityService.findOne(
      "api::enrollment.enrollment",
      enrollmentId,
      { populate: ["course"] }
    );
    if (!enrollment) return ctx.notFound("Enrollment not found.");

    const amount = enrollment.course.price;

    // Créer le paiement (Pending)
    const payment = await strapi.entityService.create("api::payement.payement", {
      data: { enrollment: enrollmentId, method, amount, status: "Pending" },
    });

    // Appel au service
    const { referenceId, redirectUrl } = await strapi
      .service("api::payement.payement")
      .sendMobilePayment({
        provider: method,
        amount,
        phone,
        txId: payment.id,
      });

    ctx.send({
      paymentId: payment.id,
      referenceId,
      redirectUrl, // utile pour Moov
    });
  } catch (e) {
    strapi.log.error(e);
    ctx.internalServerError("Failed to initialize payment");
  }
},


  async callback(ctx) {
    try {
      const { transactionId, status } = ctx.request.body;

      if (!transactionId || !status) {
        return ctx.badRequest('Missing transaction data.');
      }

      const payment = await strapi.db.query('api::payement.payement').findOne({
        where: { id: transactionId },
      });

      if (!payment) return ctx.notFound('Payment not found.');

      if (status === 'SUCCESSFUL') {
        await strapi.entityService.update('api::payement.payement', payment.id, {
          data: { status: 'Success' },
        });

        await strapi.entityService.update('api::enrollment.enrollment', payment.enrollment, {
          data: { status: 'Paid' },
        });
      }

      ctx.send({ ok: true });
    } catch (err) {
      console.error(err);
      ctx.internalServerError('Callback processing failed.');
    }
  },

}));
