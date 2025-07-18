

const Sidebar = () => {

    return (
        <div className="w-full bg-gray-900 text-white p-4 h-screen">
            <p className="font-bold">Tasks</p>
            <ul className="pl-3 [&>li]:py-2 text-sm mt-4">
                <li>{'Available ('}<span className="text-green-500">6</span>{')'}</li>
                <li>{'Completed ('}<span className="text-green-500">5</span>{')'}</li>
            </ul>    
        </div>
    )
}

export default Sidebar;