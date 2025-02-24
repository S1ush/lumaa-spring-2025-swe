import { Link } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800">
      <div className="max-w-md w-full m-4">
        <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back!
            </h2>
            <p className="text-gray-600">
              Please sign in to continue
            </p>
          </div>
          <LoginForm />
          <div className="mt-6 text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <Link
              to="/register"
              className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
            >
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
