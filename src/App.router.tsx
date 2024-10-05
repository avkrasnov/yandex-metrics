import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App';
import Main from './pages/main';

export default function AppRouter() {
    return createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App />}>
                <Route path="" element={<Main />} />
            </Route>,
        ),
    );
}
