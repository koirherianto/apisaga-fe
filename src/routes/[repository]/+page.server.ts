import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({cookies, params}) => {
    
	const token = cookies.get('token');
    const userString = cookies.get('user');
    const user = userString ? JSON.parse(userString) : null;
    const repository = params.repository;
    
    if (!token || !user) {
        console.log('User is logged in');
        
        redirect(307, '/u/' + user!.username +'/project');
    }

    return {
        parameter : repository
    }
};