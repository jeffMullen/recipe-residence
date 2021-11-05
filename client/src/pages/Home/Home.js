import React from 'react';

import styles from './Home.module.scss';

function Home() {


    return (
        <>
            <div className="home-banner container-fluid">
                <div className="hero-container row w-100">
                    <div className={`${styles.heroImage} hero col`}>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;