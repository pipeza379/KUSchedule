import React from 'react';
import StickyBox from 'react-sticky-box'
import '../asset/css/Sidebar.css'

function Sidebar() {
        return (
            <React.Fragment>
                <StickyBox className="side">
                    <a href="#main-course">Menu<br /></a>
                    <a href="#ListBox">List<br /></a>
                    <a href="#Name">Schedule<br /></a>
                    {/* <a href="#">EditTable<br /></a> */}
                </StickyBox>
            </React.Fragment>
        )
}

export default Sidebar