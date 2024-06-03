import type { PageServerLoad } from "../u/$types";
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({cookies}) => {
    
    // delete all cookies
    cookies.delete('token', { path: '/' });
    cookies.delete('user', { path: '/' });

    // redirect to login
    redirect(307, '/login');
};