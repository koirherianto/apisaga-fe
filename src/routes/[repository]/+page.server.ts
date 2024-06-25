import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({cookies, params}) => {
    
	const token = cookies.get('token');
    const userString = cookies.get('user');
    const user = userString ? JSON.parse(userString) : null;
    const repository = params.repository;
    
    if (!token || !user) {
        console.log('User is logged in');
        
        redirect(307, '/');
    }
    
    return {
        parameter : repository,
        user,
        projectName : params.repository
    }
};


export const actions = {
    create: async ({request})  => {
        const form = await request.formData();

        console.log('form ccccccccccc', form);
        
    }
} satisfies Actions;