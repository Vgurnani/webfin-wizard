import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {
    DashboardMenuIcon,
    BlogMenuIcon,
    DrawerArrowIcon,
    EditSiteMenuIcon,
    ViewWebsiteIcon,
    MarketingMenuIcon,
    SupportMenuIcon,
} from '../../utils/svg'
import whiteLogo from '../../images/header/webFin-white-logo.png';
const SideBar = () => {
    const [ isSideBarActive, toggleSideBar ] = React.useState(false);
    const theme = useSelector((state) => state.theme)
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
                <a>
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
                <li className={ `${ theme.sidebarActive === 'edit-site' ?  'active' : '' }` } >
                    <Link to="/edit-site">
                        Marketing
                        <MarketingMenuIcon />
                    </Link>
                </li>
                <li className={ `${ theme.sidebarActive === 'edit-site' ?  'active' : '' }` } >
                    <Link to="/edit-site">
                        Support
                        <SupportMenuIcon />
                    </Link>
                </li>

            </ul>
        </aside>)
}

export default withRouter(SideBar)