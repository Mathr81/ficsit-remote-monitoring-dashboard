import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { targetUrl } = req.query;

    if (!targetUrl || typeof targetUrl !== 'string') {
        return res.status(400).json({ error: 'The "targetUrl" query parameter is required.' });
    }

    try {
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: {
                'Accept': 'application/json',
            },
            body: req.body ? JSON.stringify(req.body) : undefined,
        });

        const contentType = response.headers.get('content-type');
        let data;

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        // Forward the original headers and status code
        response.headers.forEach((value, name) => {
            res.setHeader(name, value);
        });

        res.status(response.status).send(data);

    } catch (error: any) {
        console.error('Proxy error:', error);
        res.status(502).json({ error: 'Failed to proxy request.', details: error.message });
    }
}
