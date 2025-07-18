import Sidebar from "../Sidebar/Sidebar";
import TasksContainer from "../TasksContainer/TasksContainer";


const HomeWrapper = () => {

    return (
        <div className="flex md:flex-row flex-col-reverse h-screen justify-between items-start">
           <div className="md:w-[25%] w-full">
                <Sidebar />
            </div>
            <div className="md:flex-1 w-full">
                <TasksContainer />
            </div> 
        </div>
    )
}

export default HomeWrapper;