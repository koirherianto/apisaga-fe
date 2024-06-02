import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({cookies}) => {
	const token = cookies.get('token');

    if (!token) {
        return {
            status: 401,
            redirect: '/login',
        };
    }

    const response = await fetch('http://localhost:3333/api/projects', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });

    const responseData = await response.json();

    console.log(responseData);
};