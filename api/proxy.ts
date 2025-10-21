
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { targetUrl } = req.query;

    if (!targetUrl || typeof targetUrl !== 'string') {
        return res.status(400).json({ error: 'The "targetUrl" query parameter is required.' });
    }

    try {
        // Forward the request to the target URL
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: {
                'Accept': 'application/json',
            },
            // Vercel automatically handles body parsing, but we pass it along if it exists
            body: req.body ? JSON.stringify(req.body) : undefined,
        });

        // Get the response from the target server
        const data = await response.json();

        // Send the response back to the client
        res.status(response.status).json(data);

    } catch (error: any) {
        console.error('Proxy error:', error);
        res.status(502).json({ error: 'Failed to proxy request.', details: error.message });
    }
}
