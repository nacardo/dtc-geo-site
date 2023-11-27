import type { PageServerLoad } from './geocode/$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	geocode: async ({ request }) => {
		const data = await request.formData();
		console.log(data);
	}
};
