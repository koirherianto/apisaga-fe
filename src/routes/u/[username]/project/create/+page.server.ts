import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get('token');

    if (!token) {
        redirect(307, '/login');
    }
};

export const actions = {
    create: async ({ cookies, request }) => {
        const token = cookies.get('token');
        const userString = cookies.get('user');
        const user = userString ? JSON.parse(userString) : null;
        const form = await request.formData();

        const body = {
            title: form.get('title'),
            description: form.get('description'),
            type: form.get('type'),
            visibility: form.get('visibility')
        }

        const response = await fetch('http://localhost:3333/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(body),
        });

        const responseData = await response.json();

        console.log(responseData);


        if (response.status === 201) {
            redirect(307, '/u/' + user.username + '/project');
        } else if (response.status === 422) {
            const errors: { [key: string]: string } = {};

            for (const error of responseData.errors) {
                errors[error.field] = error.message;
            }
            return fail(422, {
                error: errors,
                old: body
            });
        } else if(response.status === 401) {
            redirect(307, '/login');
        }else {
            // return {
            //     status: 500,
            //     error: new Error(responseData.message)
            // };
        }
    }
} satisfies Actions;