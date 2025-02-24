import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800">
      <div className="max-w-md w-full m-4">
        <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create a new account
            </h2>
            <p className="text-gray-600">
              Sign up to get started
            </p>
          </div>
          <RegisterForm />
          <div className="mt-6 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              to="/login"
              className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}