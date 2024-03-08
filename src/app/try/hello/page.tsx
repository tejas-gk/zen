// pages/callback.js
import { useRouter } from 'next/router';
import { getToken } from '../utils/googleAuth';

export default function CallbackPage() {
    const router = useRouter();

    useEffect(() => {
        const code = router.query.code;
        if (code) {
            getToken(code)
                .then(tokens => {
                    // Store tokens in session or cookies
                    router.push('/emails');
                })
                .catch(error => {
                    console.error('Error fetching token:', error);
                });
        }
    }, [router.query.code]);

    return <div>Authenticating...</div>;
}
