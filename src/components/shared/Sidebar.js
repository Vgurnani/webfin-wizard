import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../middleware/auth';
import history from 'utils/history'

import {
    ChevronRight,
    DashboardMenuIcon,
    BlogMenuIcon,
    DrawerArrowIcon,
    EditSiteMenuIcon,
    ViewWebsiteIcon,
    MarketingMenuIcon,
    SupportMenuIcon,
} from '../../utils/svg'
import whiteLogo from '../../images/header/webFin-white-logo.png';
import profilePic from 'images/user-avatar.png';
import { Dropdown } from 'react-bootstrap';
import { ROUTES } from 'constants/appRoutes';

const SideBar = () => {
    const dispatch  = useDispatch();
    const [ isSideBarActive, toggleSideBar ] = React.useState(false);
    const data = useSelector(state => state.user.sessionData?.data?.data)
    const theme = useSelector((state) => state.theme)

    const logout = () => {
        dispatch(logoutUser())
    }
    return(
        <aside className={ `dashboard-menu ${ isSideBarActive ? 'toggle-sidebar' : '' }` }>
            <div className="drawer-toggle" onClick={ () => toggleSideBar(!isSideBarActive) }>
                <DrawerArrowIcon />
            </div>
            <div className="sidebar-logo">
                <a>
                    <img src={ whiteLogo } />
                </a>
            </div>
            <div className="sidebar-view-site">
                <a href={ `https://${ data && data.sites[ 0 ].domain }` } rel="noreferrer" target='_blank' >
                    <span>View Website</span>
                    <ViewWebsiteIcon />
                </a>
            </div>
            <ul>
                <li className={ `${ theme.sidebarActive === 'dashboard' ?  'active' : '' }` }>
                    <Link to="/dashboard">
                        Dashboard
                        <DashboardMenuIcon />
                    </Link>
                </li>
                <li className={ `${ theme.sidebarActive === 'blog' ?  'active' : '' }` } >
                    <Link to="/blogs">
                        Blog
                        <BlogMenuIcon />
                    </Link>
                </li>
                <li className={ `${ theme.sidebarActive === 'edit-site' ?  'active' : '' }` } >
                    <Link to="/edit-site">
                        Edit Site
                        <EditSiteMenuIcon />
                    </Link>
                </li>
                <li className={ `${ theme.sidebarActive === '' ?  'active' : '' }` } >
                    <Link to="#">
                        Marketing
                        <MarketingMenuIcon />
                    </Link>
                </li>
                <li className={ `${ theme.sidebarActive === '' ?  'active' : '' }` } >
                    <Link to="#">
                        Support
                        <SupportMenuIcon />
                    </Link>
                </li>
                <li className="header-profile-img">
                    <Dropdown >
                        <Dropdown.Toggle>
                            <span>
                                <span className="nav-profile-pic">
                                    <img src={ profilePic } />
                                    <span className="notification-bubble">1</span>
                                </span>
                                <span className="dropdown-label">My Account</span>
                            </span>
                            <ChevronRight />
                        </Dropdown.Toggle>

                        <Dropdown.Menu menuAlign="right">
                            <Dropdown.Item onClick={ () => history.push(ROUTES.USER_PROFILE) }>My Account</Dropdown.Item>
                            <Dropdown.Item onClick={ logout }>Log out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
        </aside>)
}

export default withRouter(SideBar)