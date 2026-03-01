// config/middlewares.js
module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors', {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'https://happy-frontend-3oyr-cc89arqgq-briberas-projects.vercel.app',
        'https://happy-frontend-3oyr.vercel.app',
        'http://localhost:3001',
        'https://ccj-frontend-3oyr.vercel.app',
        'https://ccjbenin229.vercel.app',
      ],
      // origin: (ctx ) => {
      //   const allowedOrigins = [
      //     'https://ccj-frontend-3oyr.vercel.app',
      //     'https://ccjbenin229.vercel.app', // Add your specific domain
      //     'http://localhost:3001',
      //     'https://ccjbenin.vercel.app',
      //   ];

      //   const origin = ctx.request.header.origin;
        
      //   // Autoriser tous les domaines Vercel de votre projet
      //   if (origin && origin.includes('vercel.app' )) {
      //     return origin;
      //   }
        
      //   if (allowedOrigins.includes(origin)) {
      //     return origin;
      //   }
        
      //   return allowedOrigins[0];
      // },

      // credentials: true,
      // methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      // keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];