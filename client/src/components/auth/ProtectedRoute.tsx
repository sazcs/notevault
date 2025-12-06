import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className='min-h-screen bg-neutral-950 flex items-center justify-center'>
				<div className='text-neutral-400'>Loading...</div>
			</div>
		);
	}

	if (!user) {
		return <Navigate to='/login' replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
