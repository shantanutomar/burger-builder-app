import React from 'react';
import Classes from './BuildControls.css'
import BuildControl from '../BuildControls/BuildControl/BuildControl';

var BuildControls = (props) => {
    return(
    <div className = {Classes.BuildControls}>
        <BuildControl/>
    </div>
    );
};

export default BuildControls;