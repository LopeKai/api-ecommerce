import express from 'express';
import { initializeApp as initializeAppAdminApp } from 'firebase-admin/app';
import { initializeApp as initializeFirebaseApp } from 'firebase/app'
import { routes } from './routes/index.js';
import { errorHandler } from './middlewares/error-handle.middleware.js';
import { PageNotFoundHandler } from './middlewares/page-not-found.middleware.js';
import { auth } from './middlewares/auth.middleware.js';
import { onRequest } from 'firebase-functions/v2/https';
import { swaggerDocs } from './routes/swagger-docs.route.js';

initializeAppAdminApp();
initializeFirebaseApp({
    apiKey: process.env.FIRE_API_KEY
});

const app = express();

swaggerDocs(app);
auth(app);
routes(app);
PageNotFoundHandler(app);
errorHandler(app);

export const api = onRequest(app);

