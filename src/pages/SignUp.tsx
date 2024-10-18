import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSignUp = async () => {
        setError(null); // Reset error before making the request
        setSuccessMessage(null); // Reset success message
        setIsLoading(true); // Set loading state
        if (!email || !password) {
            setError('Please provide both email and password.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('https://reqres.in/api/register', {
                email,
                password,
            });

            console.log('Sign Up successful:', response.data);
            setSuccessMessage('Sign Up successful! Redirecting to Sign In...');
            setTimeout(() => {
                navigate('/signin'); // Redirect to Sign In page after successful sign-up
            }, 2000);
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.error || 'Invalid registration details.');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

                {error && <div className="mb-4 p-2 text-red-700 bg-red-100 rounded">{error}</div>}
                {successMessage && <div className="mb-4 p-2 text-green-700 bg-green-100 rounded">{successMessage}</div>}

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={handleSignUp}
                        className={`w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ${isLoading ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <p className='text-center underline cursor-pointer pt-5' onClick={() => navigate('/signin')}>
                    SignIn
                </p>
            </div>
        </div>
    );
};

export default SignUp;
