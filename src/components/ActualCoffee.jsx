import React from "react";
import { useGlobalContext } from "../context/GlobalContext";

function ActualCoffee({ coffeeOne }) {

    const { dotsLevelManager } = useGlobalContext();

    return (
        <div className="actual-coffee">
            <div className="spacing"></div>
            <div className="compared-coffee">

                <h3>{coffeeOne.title}</h3>

                <div className="coffee-description">
                    <p>Tipo: <strong>{coffeeOne.category}</strong></p>
                    <p>Origine: <strong>{coffeeOne.origin}</strong></p>
                    <p>Altitudine: <strong>{coffeeOne.altitude} mt.</strong></p>
                    <p>Varietà: <strong>{coffeeOne.variety.join(", ")}</strong></p>
                    <p>Tipologia di chicco: <strong>{coffeeOne.bean}</strong></p>
                </div>

                <div className="coffee-profile">
                    <span className="taste"><p>Sentori: </p><strong>{coffeeOne.profile.flavours.join(", ")}</strong></span>
                    <p>Livello acidità: {dotsLevelManager(coffeeOne.profile.acidity)}</p>
                    <p>Livello dolcezza: {dotsLevelManager(coffeeOne.profile.sweetness)}</p>
                    <p>Struttura corpo: {dotsLevelManager(coffeeOne.profile.body)}</p>
                </div>

                <p className="comapared-price">Prezzo: <strong>{coffeeOne.price.toFixed(2)}€</strong></p>
            </div>
        </div>
    );
};

export default React.memo(ActualCoffee);