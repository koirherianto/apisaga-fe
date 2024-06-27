import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({cookies, params}) => {
    
	const token = cookies.get('token');
    const userString = cookies.get('user');
    const user = userString ? JSON.parse(userString) : null;
    const repository = params.repository;
    
    if (!token || !user) {
        redirect(307, '/');
    }

    const response = await fetch('http://localhost:3333/api/' + params.repository + '/' + params.version + '/' + params.topbar + '/lefbars', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });

    console.log('response:', response);
    

    const leftbars = [
        {name : 'a'},
        {name : 'b'},
        {name : 'c'}
    ]
    
    return {
        parameter : repository,
        leftbars : leftbars,
        param : {
            repository : params.repository,
            version : params.version,
            topbar : params.topbar,
            leftbar : params.leftbar
        }
    }
};


export const actions = {
	lol: async ({ request }) => {
		console.log('Form submitted di pop:');
        const leftbars = ['a','b','c'];
		return {
			success: true,
            leftbars,
			message: 'Menu created successfully'
		};
	}
} satisfies Actions;
