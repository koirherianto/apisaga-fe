import type { PageServerLoad } from "../u/$types";
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({cookies}) => {
    const token = cookies.get('token');
    const userString = cookies.get('user');
    const user = userString ? JSON.parse(userString) : null;

    if (!token && !user) {
        return {
            status: 401,
            redirect: '/login',
        };
    }

    const response = await fetch('http://localhost:3333/api/logout', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    await response.json();
    if (response.status === 200) {
        // delete all cookies
        cookies.delete('token', { path: '/' });
        cookies.delete('user', { path: '/' });

        // redirect to login
        redirect(307, '/login');
    } else {
        redirect(307, '/u/' + user.username +'/project')
    }
};