"use client"

import { useAuth } from "@/context/authContext";

const Sidebar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="w-full bg-gray-900 text-white p-4 h-screen flex justify-between flex-col">
            <div>
                <p className="font-bold">Tasks</p>
                <ul className="pl-3 [&>li]:py-2 text-sm mt-4">
                    <li>{'Available ('}<span className="text-green-500">6</span>{')'}</li>
                    <li>{'Completed ('}<span className="text-green-500">5</span>{')'}</li>
                </ul>
            </div>

            <div className="mb-20">
            {user && (
                    <button
                        className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold transition-colors"
                        onClick={logout}
                    >
                        Logout
                    </button>
                        )}
            </div>
         
        </div>
    )
}

export default Sidebar;