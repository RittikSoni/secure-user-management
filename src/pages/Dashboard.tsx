
import { useAuthStore } from '../store/authStore';
import { useEffect, useState } from 'react';
import { getUserData } from '../services/api';

export const Dashboard = () => {
    const { user } = useAuthStore();
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const data = await getUserData(user.id);
                setUserData(data);
            }
        };
        fetchData();
    }, [user]);

    if (!user) {
        return <div>Please login</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">

                {userData ? (
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h1 className='font-bold text-2xl'>Dashboard</h1>
                        <h2 className="text-xl font-medium text-gray-700 mb-2">Welcome, {userData.data.first_name}!</h2>
                        <p className="text-gray-600">Here is your user information:</p>
                        <ul className="mt-4 space-y-2">
                            <li className="p-2 bg-white border rounded-md">
                                <strong>ID:</strong> {userData.data.id}
                            </li>
                            <li className="p-2 bg-white border rounded-md">
                                <strong>last:</strong> {userData.data.last_name}
                            </li>
                        </ul>
                    </div>
                ) : (
                    <p className="text-gray-600">No user data available.</p>
                )}
            </div>
        </div>
    );
};
