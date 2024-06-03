import type { PageServerLoad } from "./$types";
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load: PageServerLoad = async ({cookies}) => {
	const token = cookies.get('token');
    
    if (!token) {
        redirect(307, '/login');
    }

    const response = await fetch('http://localhost:3333/api/projects', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });

    const responseData = await response.json();

    if (response.status === 200) {
        return {
            projects : responseData.data,
            isLogin : responseData.isLogin
        };
    } else {
        return {
            status: 500,
            error: new Error(responseData.message)
        };
    }
    
};


export const actions = {
    logoutx: async ({ cookies }) => {
        console.log('ini dijalankan');
        
        // Remove the cookies
        cookies.delete('token', { path: '/' });
        cookies.delete('user', { path: '/' });

        // Redirect to login page or home page
        throw redirect(307, '/login'); // or '/home' if you have a home page
    }
} satisfies Actions;