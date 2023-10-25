import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';
import LoadingScreen from '../component/LoadingScreen';

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
(
    <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
    </Suspense>
);

// *  AUTHENTICATION PAGES
const Login = Loadable(lazy(() => import('../component/SignInSide')));
const Register = Loadable(
    lazy(() => import('../component/SignUp'))
);

const routes: RouteObject[] = [
    {
        path: 'authentication',
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
        ],
    },

];

export default routes;