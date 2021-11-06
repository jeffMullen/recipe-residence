import React from 'react';

import styles from './Home.module.scss';

function Home() {


    return (
        <>
            <div className={`${styles.homeBanner} container-fluid`}>
                <div className={`${styles.heroContainer} row w-100`}>
                    <div className={`${styles.heroImage} col`}>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home;