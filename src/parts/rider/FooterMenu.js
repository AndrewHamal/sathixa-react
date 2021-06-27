
import FeatherIcon from 'feather-icons-react';
import {useEffect, useState} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import { TabBar, Icon } from 'antd-mobile'

const FooterMenu = () => {

    const location = useLocation()
    const [path, setActive] = useState()
    const history = useHistory()

    useEffect(() => {
        setActive(location.pathname)
    },[location])

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
        // <div className={'footerMenu px-2 justify-content-between'}>
        //     <div className={"d-flex"}>
        //         <div className={"mx-auto"}>
        //             <div className={"text-center"}>
        //                 <Link to={'/dashboard'}>
        //                     <i className={path === '/dashboard' ? 'fa fa-home fa-lg w-100 active' : 'fa fa-home fa-lg w-100' }></i>
        //                     <span className={ path === '/dashboard' ? 'active' : '' }>Home</span>
        //                 </Link>
        //             </div>
        //         </div>
        //         <div className={"mx-auto"}>
        //             <div className={"text-center"}>
        //                 <Link to={'/package'}>
        //                     <i className={path === '/package' ? 'fa fa-briefcase fa-lg w-100 active' : 'fa fa-briefcase fa-lg w-100' }></i>
        //                     <span className={ path === '/package' ? 'active' : '' }>Packages</span>
        //                 </Link>
        //             </div>
        //         </div>
        //         <div className={"mx-auto"}>
        //             <div className={"text-center"}>
        //                 <Link to={'/wallet'}>
        //                     <i className={"fa fa-wallet fa-lg w-100"}></i>
        //                     <span className={ path === '/wallet' ? 'active' : '' }>Wallet</span>
        //                 </Link>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default FooterMenu