import * as Sentry from '@sentry/react';
import { createRoot } from 'react-dom/client';

import App from '@/components/App';

Sentry.init({
    // This is safe to be public.
    // See https://docs.sentry.io/product/sentry-basics/concepts/dsn-explainer/ for more information.
    dsn: 'https://b25e7066a7d647cea237cd72beec5c9f@app.glitchtip.com/6107',
    integrations: [],
});

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
