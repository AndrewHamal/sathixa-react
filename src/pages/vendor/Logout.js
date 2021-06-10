import {Link, Redirect, useHistory} from "react-router-dom";

const Dashboard = (props) => {
    const logoutPerform = () => {
        props.logout()
    }
    logoutPerform()

    return <Redirect to={'/'} />
}




export default Dashboard