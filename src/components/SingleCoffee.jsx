import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle as faSolidCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as faRegularCircle } from '@fortawesome/free-regular-svg-icons';

function SingleCoffee({ coffeeInfo }) {

    const dotsLevel = () => {
        let dots = [];
        for (let i = 0; i < 5; i++) {
            if (i < coffeeInfo.profile.acidity && i < coffeeInfo.profile.sweetness && i < coffeeInfo.profile.body) {
                dots.push(<FontAwesomeIcon key={i} icon={faSolidCircle} style={{ color: "black" }} />);
            } else {
                dots.push(<FontAwesomeIcon key={i} icon={faRegularCircle} style={{ color: "black" }} />);
            };
        };
        return dots;
    };

    return (
        <div className="coffee-details">
            <h1>{coffeeInfo.title}</h1>
            <div className="coffee-details-card">
                <div>
                    <img src={coffeeInfo.image} alt={coffeeInfo.title} />
                </div>
                <div className="coffee-details-body">
                    <div className="coffee-description">
                        <p>Tipo: <strong>{coffeeInfo.category}</strong></p>
                        <p>Origine: <strong>{coffeeInfo.origin}</strong></p>
                        <p>Altitudine: <strong>{coffeeInfo.altitude} mt.</strong></p>
                        <p>Varietà: <strong>{coffeeInfo.variety.join(", ")}</strong></p>
                        <p>Processo di lavorazione: <strong>{coffeeInfo.process}</strong></p>
                    </div>
                    <div className="coffee-profile">
                        <span className="taste"><p>Sentori: </p><strong>{coffeeInfo.profile.flavours.join(", ")}</strong></span>
                        <p>Livello acidità: <strong>{dotsLevel()}</strong></p>
                        <p>Livello dolcezza: <strong>{dotsLevel()}</strong></p>
                        <p>Struttura corpo: <strong>{dotsLevel()}</strong></p>
                    </div>
                    <div>
                        <p>Prezzo: <strong>{coffeeInfo.price.toFixed(2)}€</strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(SingleCoffee);