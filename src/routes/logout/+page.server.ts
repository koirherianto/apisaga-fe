import type { PageServerLoad } from "../u/$types";
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({cookies}) => {
    console.log('logout load dijalankan');
    
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

    
    const responseData = await response.json();
    console.log(responseData);
    console.log({
        status: response.status,
        redirect: '/u/' + user.username +'/project',
    
    });
    
    
    if (response.status === 200) {
        // delete all cookies
        cookies.delete('token', { path: '/' });
        cookies.delete('user', { path: '/' });
        redirect(307, '/login');
    } else if(response.status === 401 ){
        cookies.delete('token', { path: '/' });
        cookies.delete('user', { path: '/' });
        redirect(307, '/login');
    } else {
        redirect(307, '/u/' + user.username +'/project')
    }
};