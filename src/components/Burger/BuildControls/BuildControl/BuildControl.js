import React from 'react';
import Classes from './BuildControl.css';

var BuildControl = (props) => {
    return(
    <div className = {Classes.BuildControl}>
        <div className = {Classes.Label}> {props.Label} </div>
        <button className = {Classes.Less}> Less </button>
        <button className = {Classes.More}> More </button>   
    </div>
    );
};

export default BuildControl;

