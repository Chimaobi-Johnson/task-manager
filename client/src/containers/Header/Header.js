"use client"

import { useAuth } from "@/context/authContext";


const Header = () => {

    const { user } = useAuth();

    return (
        <div className="py-6 px-3 border-b border-b-gray-400 flex justify-between items-center text-sm">
            <div className="font-bold">Task Manager</div>
            <div>{user?.email ? user.email.replace(/@gmail\.com$/, "") : ""}</div>
        </div>
      )
}

export default Header;