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
    login: async ({cookies, request})  => {
        const form = await request.formData();

        const body = {
            email : form.get('email'),
            password : form.get('password'),
        }

        const response = await fetch('http://localhost:3333/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const responseData = await response.json();

        if (response.status === 200) {
            cookies.set('token', responseData.token.token, { path: '/' });
            cookies.set('user', JSON.stringify(responseData.data), { path: '/' });
            redirect(307, '/u/' + responseData.data.username +'/project');
        }else if (response.status === 401) {
            return fail(401, {
				error: {
                    'email' : responseData.message,
                    'password' : responseData.message
                },
                old: {
                    'email' : body.email,
                    'password' : ''
                }
			});
        } else {
            return fail(500, {
                error: {
                    'email' : responseData.message,
                    'password' : responseData.message
                },
                old : {
                    'email' : body.email,
                    'password' : ''
                }
            });
        }
    }
} satisfies Actions;