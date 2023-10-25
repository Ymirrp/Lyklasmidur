import React from 'react';

const Card = ({ children }) => {

    return (
        <div className="card custom-card border-radius mt-md-5">
            <div className="card-body">
                { children }
            </div>
        </div>
    );
};

export { Card };