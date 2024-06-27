import { redirect } from "@sveltejs/kit";
import type { PageServerLoad} from './$types';

export const load: PageServerLoad = async ({cookies, params}) => {
    
	const token = cookies.get('token');
    const userString = cookies.get('user');
    const user = userString ? JSON.parse(userString) : null;
    
    if (!token || !user) {
        redirect(307, '/');
    }

    const response = await fetch('http://localhost:3333/api/projectDefaultVersion/' + params.repository, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });

    const responseData = await response.json();
    const data = responseData.data;
    const rangkai = data.defaultProject + '/' + data.defaultVersion + '/' + data.defaultTopbar + '/' + data.defaultLeftbar;

    
    redirect(307, rangkai);
};