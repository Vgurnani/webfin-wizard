import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {
    DashboardMenuIcon,
    BlogMenuIcon,
} from '../../utils/svg'
const SideBar = () => {
    const theme = useSelector((state) => state.theme)
    return(
        <aside className="dashboard-menu">
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
                <li>
                    <Link to="#">
                        Test
                        <DashboardMenuIcon />
                    </Link>
                </li>
                <li>
                    <Link to="#">
                        Test
                        <DashboardMenuIcon />
                    </Link>
                </li>
                <li>
                    <Link to="#">
                        Test
                        <DashboardMenuIcon />
                    </Link>
                </li>
                <li>
                    <Link to="#">
                        Test
                        <DashboardMenuIcon />
                    </Link>
                </li>
            </ul>
        </aside>)
}

export default withRouter(SideBar)