import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {
    DashboardMenuIcon,
    BlogMenuIcon,
    DrawerArrowIcon,
} from '../../utils/svg'
const SideBar = () => {
    const [ isSideBarActive, toggleSideBar ] = React.useState(false);
    const theme = useSelector((state) => state.theme)
    return(
        <aside className={ `dashboard-menu ${ isSideBarActive ? 'toggle-sidebar' : '' }` }>
            <div className="drawer-toggle" onClick={ () => toggleSideBar(!isSideBarActive) }>
                <DrawerArrowIcon />
            </div>
            <ul>
                <li className={ `${ theme.sidebarActive === 'dashboard' ?  'active' : '' }` }>
                    <Link to="/dashboard">
                        Dashboard
                        <DashboardMenuIcon />
                    </Link>
                </li>
                <li className={ `${ theme.sidebarActive === 'edit-site' ?  'active' : '' }` } >
                    <Link to="/edit-site">
                        Edit Site
                        <BlogMenuIcon />
                    </Link>
                </li>
                <li className={ `${ theme.sidebarActive === 'blog' ?  'active' : '' }` } >
                    <Link to="/blogs">
                        Blog
                        <BlogMenuIcon />
                    </Link>
                </li>
            </ul>
        </aside>)
}

export default withRouter(SideBar)