
import React from 'react';
import Aux from '../../hoc/Aux';
import Classes from './Layout.css'

var Layout = (props) => (
    <Aux>
        <div>Toolbar, Sidebar, Backdrop</div>
        <main className = {Classes.Content}>
            {props.children}        
        </main>
    </Aux>
);

export default Layout;