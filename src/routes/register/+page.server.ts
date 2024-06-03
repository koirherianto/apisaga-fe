import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({cookies}) => {
	const token = cookies.get('token');
    const userString = cookies.get('user');
    const user = userString ? JSON.parse(userString) : null;
    
    if (token && user) {
        redirect(307, '/u/' + user!.username +'/project');
    }
};

export const actions = {
    register: async ({cookies, request})  => {
        const form = await request.formData();

        const body = {
            name : form.get('name'),
            email : form.get('email'),
            username : form.get('username'),
            password : form.get('password'),
        }
        
        
        const response = await fetch('http://localhost:3333/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        
        const responseData = await response.json();
        console.log(responseData);
        console.log(response.status);
        
        
        if (response.status === 201) {
            cookies.set('token', responseData.token.token, { path: '/' });
            cookies.set('user', JSON.stringify(responseData.data), { path: '/' });
            redirect(307, '/u/' + responseData.data.username +'/project');
        }else if (response.status === 422) {
            const errors: { [key: string]: string } = {};

            for (const error of responseData.errors) {
                errors[error.field] = error.message;
            }

            return fail(422, {
				error: errors,
                old: {
                    'name' : body.name,
                    'email' : body.email,
                    'username' : body.username,
                    'password' : ''
                }
			});
        } else if(response.status === 401) {
            redirect(307, '/login');
        }else {
            // do something
        }
    }
} satisfies Actions;