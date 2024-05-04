import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ paths }) => {
    return (
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
        {paths.map((path, index) => (
            <li key={index} className="breadcrumb-item">
            {index === paths.length - 1 ? (
                <span>{path.name}</span>
            ) : (
                <Link to={path.url}>{path.name}</Link>
            )}
            </li>
        ))}
        </ol>
    </nav>
    );
};

export default Breadcrumb;