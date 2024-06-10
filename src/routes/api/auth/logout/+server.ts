import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// DELETE /api/auth/logout/+server
export const DELETE: RequestHandler = async ({ cookies }) => {	
    const token = cookies.get('token');

    const response = await fetch('http://localhost:3333/api/logout', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });

    if (response.status !== 200) {
        return json({success : false});
    }

    console.log(await response.json());
    
    cookies.set('token', '', { path: '/' });
    cookies.set('user', '', { path: '/' });
    
    return json({success : true});
};