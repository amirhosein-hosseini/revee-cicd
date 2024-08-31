
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/signin');
        }
    }, [isLoggedIn, router]);

    return isLoggedIn ? children : null;
};

export default PrivateRoute;