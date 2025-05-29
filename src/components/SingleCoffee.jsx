import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';

function SingleCoffee({ coffeeInfo }) {

    const { handleFavourites, toggleFavorites, dotsLevelManager } = useGlobalContext();

    return (
        <div className="coffee-details">
            <h1>{coffeeInfo.title}</h1>
            <div className="coffee-details-card">

                <div>
                    <img src={coffeeInfo.image} alt={coffeeInfo.title} />
                </div>

                <div className="coffee-details-body">
                    <div className="description-container">
                        
                        <div className="coffee-description">
                            <p>Tipo: <strong>{coffeeInfo.category}</strong></p>
                            <p>Origine: <strong>{coffeeInfo.origin}</strong></p>
                            <p>Altitudine: <strong>{coffeeInfo.altitude} mt.</strong></p>
                            <p>Varietà: <strong>{coffeeInfo.variety.join(", ")}</strong></p>
                            <p>Tipologia di chicco: <strong>{coffeeInfo.bean}</strong></p>
                        </div>

                        <div className="coffee-profile">
                            <p>Livello acidità: <strong>{dotsLevelManager(coffeeInfo.profile.acidity)}</strong></p>
                            <p>Livello dolcezza: <strong>{dotsLevelManager(coffeeInfo.profile.sweetness)}</strong></p>
                            <p>Struttura corpo: <strong>{dotsLevelManager(coffeeInfo.profile.body)}</strong></p>
                        </div>
                    </div>

                    <div>
                        <span className="taste"><p>Sentori: </p><strong>{coffeeInfo.profile.flavours.join(", ")}</strong></span>
                    </div>

                    <div>
                        <p>Prezzo: <strong className="price">{coffeeInfo.price.toFixed(2)}€</strong></p>
                    </div>
                    
                </div>
            </div>

            <button
                className="favourites-btn"
                onClick={() => toggleFavorites(coffeeInfo.id)}
            >
                {handleFavourites(coffeeInfo.id)}
            </button>
        </div>
    );
};

export default React.memo(SingleCoffee);