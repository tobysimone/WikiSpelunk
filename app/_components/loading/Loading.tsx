import './styles.css';

import React from 'react';
import { TbFidgetSpinner } from "react-icons/tb";

export default function Loading() {
    return (
        <div className="loading">
            <TbFidgetSpinner className="loading-icon text-5xl" />
        </div>
    );
};
