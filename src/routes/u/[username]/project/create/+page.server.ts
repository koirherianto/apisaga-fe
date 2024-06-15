import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';



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