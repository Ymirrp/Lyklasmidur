import React from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import './styles.css';

const App = () => {

    return (
        <Layout>
            <Home />
        </Layout>
    );
};

export { App };
