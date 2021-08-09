import {useEffect, useState} from "react";
import {useHistory, useLocation, useParams} from "react-router-dom";
import { TabBar } from 'antd-mobile'
import { countInbox } from "@/api/vendor";

const FooterMenu = () => {

    const location = useLocation()
    const [path, setActive] = useState()
    const history = useHistory()
    const { id } = useParams()
    const [count, setCount] = useState();

    useEffect(() => {
        setActive(location.pathname)
        countInbox()
        .then(res => {
            setCount(res.data)
        })
    },[id, location])

    return (
        <div className="footerMenu" style={{ position: 'fixed', width: '100%', bottom: 0 }}>
            <TabBar
                unselectedTintColor="#aeb7bf"
                tintColor="#DB2B39"
                barTintColor="white"
                tabBarPosition="bottom"
                // hidden={this.state.hidden}
                prerenderingSiblingsNumber={0}
            >

                <TabBar.Item
                    title="Home"
                    key="Life"
                    icon={ <i className="fa fa-home fa-lg "></i> }
                    selectedIcon={ <i className="fa fa-home fa-lg active"></i> }
                    selected={path === '/dashboard' ? true : false}
                    onPress={() => {history.push('/dashboard')}}
                    />

                <TabBar.Item
                    title="Inbox"
                    key="Life"
                    icon={ <i className="fa fa-comment-alt fa-lg"></i> }
                    selectedIcon={ <i className="fa fa-comment-alt fa-lg active"></i> }
                    selected={path === '/inbox' ? true : false}
                    onPress={() => {history.push('/inbox')}}
                    badge={count}
                    />

                <TabBar.Item
                    title="Package"
                    key="package"
                    icon={ <i className="fa fa-box-open fa-lg "></i> }
                    selectedIcon={ <i className="fa fa-box-open fa-lg active"></i> }
                    selected={path === '/package' ? true : false}
                    onPress={() => {history.push('/package')}}
                />

                <TabBar.Item
                    title="Profile"
                    key="profile"
                    icon={ <i className="fa fa-user fa-lg"></i> }
                    selectedIcon={ <i className="fa fa-user fa-lg active"></i> }
                    selected={path === '/profile' ? true : false}
                    onPress={() => {history.push('/profile')}}
                />


            </TabBar>
        </div>
    )
}

export default FooterMenu