// config/middlewares.js
module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "res.cloudinary.com",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "res.cloudinary.com",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers:'*',
      // origin: [
      //   'https://happy-frontend-3oyr-cc89arqgq-briberas-projects.vercel.app',
      //   'https://happy-frontend-3oyr.vercel.app',
      //   'http://localhost:3000',
      // ],
      origin: (ctx) => {
        const allowedOrigins = [
          'http://localhost:3000',
          'https://happy-frontend-3oyr-cc89arqgq-briberas-projects.vercel.app'
        ];
      
        const origin = ctx.request.header.origin;
        
        // Autoriser tous les domaines Vercel de votre projet
        if (origin && origin.includes('vercel.app')) {
          return origin;
        }
        
        if (allowedOrigins.includes(origin)) {
          return origin;
        }
        
        return allowedOrigins[0];
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];