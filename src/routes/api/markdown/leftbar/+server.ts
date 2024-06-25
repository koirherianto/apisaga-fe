import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// POST /api/markdown/leftbar/+server
export const POST: RequestHandler = async ({ cookies  }) => {
    const token = cookies.get('token');
    
    console.log('token d', token);
    
    // if (!token) {
    //     return json({success : false});
    // }

    return json({
        success: true,
    });
};
