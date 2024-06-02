import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	return { 'tes' : 'tes2' };
};

export const actions = {
    login: async ({cookies, request})  => {
        const form = await request.formData();

        const email = form.get('email');
        const password = form.get('password');

        const data = {
            email,
            password,
        }

        const response = await fetch('http://localhost:3333/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        console.log(responseData);

        if (response.status === 200) {
            cookies.set('token', responseData.token.token, { path: '/' });
            cookies.set('user', JSON.stringify(responseData.data), { path: '/' });
            throw redirect(307, '/post');
        }else if (response.status === 401) {
            return fail(422, {
				description: 'a',
				error: {
                    'email' : responseData.message,
                    'password' : responseData.message
                }
			});
        }
    }
} satisfies Actions;