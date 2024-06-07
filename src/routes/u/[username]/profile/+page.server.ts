import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({cookies}) => {
	const token = cookies.get('token');

    if (!token) {
        redirect(307, '/logout');
    }

    const response = await fetch('http://localhost:3333/api/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });

    const responseData = await response.json();

    // console.log({
    //     dari : 'load profile +page.server.ts',
    //     data: responseData,
    // });

    if (response.status === 200) {
        return {
            user : responseData.data,
        };
    } else {
        redirect(307, '/logout');
    }
};