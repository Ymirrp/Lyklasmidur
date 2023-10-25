import React, { Component } from 'react';
import { Background } from './Background';
import { Card } from './Card';

const Layout = ({ children }) => {

    return (
        <>
            <Background />
            <Card>
                {children}
            </Card>
        </>
    );
};

export { Layout };
