import Sidebar from "../Sidebar/Sidebar";
import TasksContainer from "../TasksContainer/TasksContainer";


const HomeWrapper = () => {

    return (
        <div className="flex justify-between items-start">
           <div className="w-[25%]">
                <Sidebar />
            </div>
            <div className="flex-1">
                <TasksContainer />
            </div> 
        </div>
    )
}

export default HomeWrapper;