// // config/env/production/middlewares.js


// config/env/production/middlewares.js
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'img-src': ["'self'", "data:", "blob:", "res.cloudinary.com", "*.amazonaws.com"],
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: (ctx) => {
        // Liste des origines autorisées
        const allowedOrigins = [
          'https://happy-frontend-3oyr.vercel.app',
          'http://localhost:3000',
          'http://localhost:5173',
        ];
        
        const origin = ctx.request.header.origin;
        
        // Autoriser tous les déploiements Vercel (preview, production)
        if (origin && origin.match(/^https:\/\/happy-frontend-3oyr.*\.vercel\.app$/)) {
          return origin;
        }
        
        // Autoriser les origines spécifiques
        if (allowedOrigins.includes(origin)) {
          return origin;
        }
        
        // Par défaut, autoriser la première origine
        return allowedOrigins[0];
      },
  
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      credentials: true,
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];