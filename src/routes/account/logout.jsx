export async function action({context, request}) {
  if (request.method !== 'POST') {
    return new Response('Post required to logout', {status: 405, headers: {Allow: 'POST'}});
  }
  await context.session.set('customerAccessToken', '');
  return new Response();
}

export default function Logout() { return null; }

