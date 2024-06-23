import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { compile } from 'mdsvex';

// POST /api/markdown/tohtml/+server
export const POST: RequestHandler = async ({ cookies, request  }) => {
    const token = cookies.get('token');
    
    if (!token) {
        return json({success : false});
    }

    const { markdown } = await request.json();

    const mdsvexOptions = {
        extensions: ['.md', '.svx'],
    }
    
    const transformed_code = await compile(markdown, mdsvexOptions);
    const html = transformed_code?.code;

    return json({
        success: true,
        html
    });
};
