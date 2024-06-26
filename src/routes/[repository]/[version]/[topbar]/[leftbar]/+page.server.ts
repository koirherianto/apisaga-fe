import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({cookies, params}) => {
    
	const token = cookies.get('token');
    const userString = cookies.get('user');
    const user = userString ? JSON.parse(userString) : null;
    const repository = params.repository;
    
    if (!token || !user) {
        redirect(307, '/');
    }
    
    return {
        parameter : repository,
        param : {
            repository : params.repository,
            version : params.version,
            topbar : params.topbar,
            leftbar : params.leftbar
        }
    }
};
