import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookie, faCheese, faWineGlassEmpty, faHotdog, faPlateWheat, faBowlRice, faBurger, faCakeCandles, faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import MainImage from "../../../src/assets/images/main-images.png";

const icons = [
    { "name": faCookie },
    { "name": faCheese },
    { "name": faWineGlassEmpty },
    { "name": faHotdog },
    { "name": faPlateWheat },
    { "name": faBurger },
    { "name": faCakeCandles },
    { "name": faChampagneGlasses },
    { "name": faBowlRice }
]

const Home = () => {
    return (
        <>
            <div className="home-container m-5">
                <div className="main-heading-text ms-5">
                    <h1 className='main-heading'>It's not just <br /> <span className='donut'>F🍩🍩</span>D, It's an EXPERIENCE</h1>
                </div>
                <div className="image me-5">
                    <img src={MainImage} alt='main-image' />
                </div>
            </div>
            <div className='m-5 bg-red home-sub-div2 row p-5'>
                <div className='col-4 border-right'>
                    <h1>What is the Speciality of us?</h1>
                </div>
                <div className='col-8'>
                    <p className='fs-5'>Emmet is an awesome tool. The lorem generator is nice but it’s code completing functionality makes it indispensable. Once you learn the syntax you can code a whole wireframe with just a few keystrokes.</p>
                </div>
            </div>
            <div className='col my-5 text-center'>
                {icons.map((icon, index) => (
                    <FontAwesomeIcon key={index} className="thin icons" icon={icon.name} />
                ))}
            </div>
            <div className='bg-red m-5 p-1 text-white'>
                <h3 className='text-center'>Helloooo!!!</h3>
            </div>
            <div className='m-5'>
                <h1 className='text-start'>Want to reserve a Table?</h1>
                <hr />
                <p className='fs-5'>Emmet is an awesome tool. The lorem generator is nice but it’s code completing functionality makes it indispensable. Once you learn the syntax you can code a whole wireframe with just a few keystrokes.</p>
            </div>
        </>
    )
}

export default Home;