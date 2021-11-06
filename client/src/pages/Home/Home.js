import React from 'react';
import styles from './Home.module.scss';
// import { useQuery } from '@apollo/client';
// import { SEARCH_RECIPES } from '../../utils/queries';


function Home() {
    // const {loading, data} = useQuery(SEARCH_RECIPES);
    // console.log("GOT DATA?",data);

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