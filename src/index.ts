import express from 'express';
import { initializeApp as initializeAppAdminApp } from 'firebase-admin/app';
import { initializeApp as initializeFirebaseApp } from 'firebase/app'
import { routes } from './routes';
import { errorHandler } from './middlewares/error-handle.middleware';
import { PageNotFoundHandler } from './middlewares/page-not-found.middleware';
import { auth } from './middlewares/auth.middleware';

initializeAppAdminApp();
initializeFirebaseApp({
    apiKey: process.env.FIRE_API_KEY
});

const app = express();
auth(app);
routes(app);
PageNotFoundHandler(app);
errorHandler(app);

app.listen(3000, () => {
    console.log('Servidor na PORTA 3000')
});

