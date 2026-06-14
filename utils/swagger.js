import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '📁 PortfolioPro API',
      version: '1.0.0',
      description:
        'REST API for PortfolioPro — manage portfolio content and visitor analytics. ' +
        '**Admin endpoints require a Bearer JWT token** obtained from `POST /api/auth/login`.',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local Development Server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter the JWT token from POST /api/auth/login',
        },
      },
      schemas: {
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Access denied. No token provided.' },
          },
        },
        VisitorHistory: {
          type: 'object',
          properties: {
            date: { type: 'string', example: 'Mon' },
            visitors: { type: 'integer', example: 142 },
          },
        },
        Analytics: {
          type: 'object',
          properties: {
            totalCount: { type: 'integer', example: 1384 },
            history: {
              type: 'array',
              items: { $ref: '#/components/schemas/VisitorHistory' },
            },
          },
        },
        SocialLink: {
          type: 'object',
          properties: {
            label: { type: 'string', example: 'GitHub' },
            iconName: { type: 'string', example: 'GitHub' },
            color: { type: 'string', example: '#ffffff' },
            link: { type: 'string', example: 'https://github.com' },
          },
        },
        HomeSection: {
          type: 'object',
          properties: {
            welcomeText: { type: 'string' },
            name: { type: 'string' },
            subtitle: { type: 'string' },
            rotatingTexts: { type: 'array', items: { type: 'string' } },
            description: { type: 'string' },
            resumeUrl: { type: 'string' },
            projectUrl: { type: 'string' },
            socials: { type: 'array', items: { $ref: '#/components/schemas/SocialLink' } },
          },
        },
        Portfolio: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            home: { $ref: '#/components/schemas/HomeSection' },
            about: { type: 'object' },
            experiences: { type: 'array', items: { type: 'object' } },
            projects: { type: 'array', items: { type: 'object' } },
            skills: { type: 'array', items: { type: 'object' } },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  // Scan all route files for @swagger JSDoc comments
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

/**
 * Registers Swagger UI middleware on the Express app.
 * Accessible at: GET /api-docs
 */
export function setupSwagger(app) {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customSiteTitle: 'PortfolioPro API Docs',
      customCss: `
        .swagger-ui .topbar { background: linear-gradient(90deg, #0f172a 0%, #1e293b 100%); }
        .swagger-ui .topbar-wrapper img { display: none; }
        .swagger-ui .topbar-wrapper::before {
          content: '📁 PortfolioPro API';
          color: #00e5ff;
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
      `,
      swaggerOptions: {
        persistAuthorization: true, // keeps token across page refresh
      },
    })
  );

  // Also expose the raw OpenAPI JSON spec
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log('📖 Swagger UI available at http://localhost:5000/api-docs');
}
