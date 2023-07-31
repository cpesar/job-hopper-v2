import React, { useState } from 'react'
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useDashboardContext } from '../pages/DashboardLayout';


const LogoutContainer = () => {
    const [showLogout, setShowLogout] = useState(false)
    const { user, logoutUser } = useDashboardContext()


    return (
        <Wrapper>
            <button type="button" class="btn logout-btn" onClick={() => setShowLogout(!showLogout)}
            >
                <FaUserCircle />
                {user?.name}
                <FaCaretDown />
            </button>
            <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'} onClick={logoutUser}>
                logout
            </div>
        </Wrapper>
    )
}

export default LogoutContainer