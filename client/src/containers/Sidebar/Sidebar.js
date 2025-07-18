"use client"

import { useAuth } from "@/context/authContext";
import { useTasks } from "@/context/tasksContext";

const Sidebar = () => {
    const { user, logout } = useAuth();
    const { tasks } = useTasks();

    const availableCount = tasks.filter(t => t.status === 'pending').length;
    const completedCount = tasks.filter(t => t.status === 'done').length;

    return (
        <div className="w-full bg-gray-900 text-white p-4 md:h-screen h-fit">
            <p className="font-bold">Tasks</p>
            <ul className="pl-3 [&>li]:py-2 text-sm mt-4">
                <li>{'Available ('}<span className="text-green-500">{availableCount}</span>{')'}</li>
                <li>{'Completed ('}<span className="text-green-500">{completedCount}</span>{')'}</li>
            </ul>
            {user && (
                <button
                    className="mt-8 w-fit text-red-400 hover:bg-red-700 py-2 rounded font-semibold transition-colors"
                    onClick={logout}
                >
                    Logout
                </button>
            )}
        </div>
    )
}

export default Sidebar;