import type { PageServerLoad } from "./$types";
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
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
            projects: responseData.data,
            isLogin: responseData.isLogin
        };
    } else if (response.status === 401) {
        redirect(307, '/login');
    } else {
        return {
            status: 500,
            error: new Error(responseData.message)
        };
    }

};