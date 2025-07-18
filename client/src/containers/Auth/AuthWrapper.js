const { default: LoginContainer } = require("./LoginContainer/LoginContainer")
const { default: RegisterContainer } = require("./RegisterContainer/RegisterContainer")


const AuthWrapper = ({ page }) => {

    return (
        <div className="bg-gray-900 w-full h-screen relative">
            {page === 'login' ? <LoginContainer /> : <RegisterContainer />}
        </div>
    )
}

export default AuthWrapper;