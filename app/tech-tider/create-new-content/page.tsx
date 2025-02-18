import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CreateContent from '@/app/tech-tider/create-new-content/CreateContent';

export default async function CreateNewContentPage() {
    const cookie = (await cookies()).get('tech-tide-auth-cookie');

    if (!cookie) {
        redirect('/tech-tider'); // Redirect to login if cookie is missing
    }

    return <CreateContent />;
}
