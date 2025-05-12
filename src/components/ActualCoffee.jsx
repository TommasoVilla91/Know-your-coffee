import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle as faSolidCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as faRegularCircle } from '@fortawesome/free-regular-svg-icons';

function ActualCoffee({ coffeeOne }) {

    // Funzione per generare i grafico a punti per i profili di caffè
    const dotsLevel = () => {
        let dots = [];
        for (let i = 0; i < 5; i++) {
            if (i < coffeeOne.profile.acidity && i < coffeeOne.profile.sweetness && i < coffeeOne.profile.body) {
                dots.push(<FontAwesomeIcon key={i} icon={faSolidCircle} style={{ color: "black" }} />);
            } else {
                dots.push(<FontAwesomeIcon key={i} icon={faRegularCircle} style={{ color: "black" }} />);
            };
        };
        return dots;
    };


    return (
        <div className="other-coffee">
            <div className="spacing"></div>
            <div className="compared-coffee">

                <h3>{coffeeOne.title}</h3>

                <div className="coffee-description">
                    <p>Tipo: <strong>{coffeeOne.category}</strong></p>
                    <p>Origine: <strong>{coffeeOne.origin}</strong></p>
                    <p>Altitudine: <strong>{coffeeOne.altitude} mt.</strong></p>
                    <p>Varietà: <strong>{coffeeOne.variety.join(", ")}</strong></p>
                    <p>Processo di lavorazione: <strong>{coffeeOne.process}</strong></p>
                </div>

                <div className="coffee-profile">
                    <span className="taste"><p>Sentori: </p><strong>{coffeeOne.profile.flavours.join(", ")}</strong></span>
                    <p>Livello acidità: {dotsLevel()}</p>
                    <p>Livello dolcezza: {dotsLevel()}</p>
                    <p>Struttura corpo: {dotsLevel()}</p>
                </div>

                <p>Prezzo: <strong>{coffeeOne.price.toFixed(2)}€</strong></p>
            </div>
        </div>
    );
};

export default React.memo(ActualCoffee);