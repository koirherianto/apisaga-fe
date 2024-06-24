import type { LayoutServerLoad } from "./$types";
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({cookies, params}) => {
	const token = cookies.get('token');
    const userString = cookies.get('user');
    const user = userString ? JSON.parse(userString) : null;
    
    if (!token || !user) {
        redirect(307, '/login');
    }

    return {
        user,
        projectName : params.repository
    }
};