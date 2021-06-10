
import FeatherIcon from 'feather-icons-react';
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

const FooterMenu = () => {

    const location = useLocation()
    const [path, setActive] = useState()
    useEffect(() => {
        setActive(location.pathname)
    },[location])

    return (
        <div className={'footerMenu px-2 justify-content-between'}>
            <div className={"d-flex"}>
                <div className={"mx-auto"}>
                    <div className={"text-center"}>
                        <Link to={'/dashboard'}>
                            <i className={path === '/dashboard' ? 'fa fa-home fa-lg w-100 active' : 'fa fa-home fa-lg w-100' }></i>
                            <span className={ path === '/dashboard' ? 'active' : '' }>Home</span>
                        </Link>
                    </div>
                </div>
                <div className={"mx-auto"}>
                    <div className={"text-center"}>
                        <Link to={'/package'}>
                            <i className={path === '/package' ? 'fa fa-briefcase fa-lg w-100 active' : 'fa fa-briefcase fa-lg w-100' }></i>
                            <span className={ path === '/package' ? 'active' : '' }>Packages</span>
                        </Link>
                    </div>
                </div>
                <div className={"mx-auto"}>
                    <div className={"text-center"}>
                        <Link to={'/wallet'}>
                            <i className={"fa fa-wallet fa-lg w-100"}></i>
                            <span className={ path === '/wallet' ? 'active' : '' }>Wallet</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterMenu