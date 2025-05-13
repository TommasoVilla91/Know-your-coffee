import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle as faSolidCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as faRegularCircle } from '@fortawesome/free-regular-svg-icons';
import { useGlobalContext } from '../context/GlobalContext';
import { faBookmark as faSolidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faRegularBookmark } from "@fortawesome/free-regular-svg-icons";

function SingleCoffee({ coffeeInfo }) {

    const { addToFavourites, removeFromFavourites, favourites } = useGlobalContext();

    // Gestione icone dei preferiti
    const handleFavourites = (id) => {
        if (favourites.some(f => f === id)) {
            return <FontAwesomeIcon icon={faSolidBookmark} />;
        } else {
            return <FontAwesomeIcon icon={faRegularBookmark} />;
        };
    };

    // Funzione per verificare se un caffè è nei preferiti
    const isFavourites = (id) => favourites.some(f => f === id);

    // Funzioni per generare icone per livelli di acidità, dolcezza e corpo
    const acidityDotsLevel = () => {
        let dots = [];
        for (let i = 0; i < 5; i++) {
            if (i < coffeeInfo.profile.acidity) {
                dots.push(<FontAwesomeIcon key={i} icon={faSolidCircle} style={{color: "#a0522d"}} />);
            } else {
                dots.push(<FontAwesomeIcon key={i} icon={faRegularCircle} style={{color: "#a0522d"}} />);
            };
        };
        return dots;
    };

    const sweetnessDotsLevel = () => {
        let dots = [];
        for (let i = 0; i < 5; i++) {
            if (i < coffeeInfo.profile.sweetness) {
                dots.push(<FontAwesomeIcon key={i} icon={faSolidCircle} style={{color: "#a0522d"}} />);
            } else {
                dots.push(<FontAwesomeIcon key={i} icon={faRegularCircle} style={{color: "#a0522d"}} />);
            };
        };
        return dots;
    };

    const bodyDotsLevel = () => {
        let dots = [];
        for (let i = 0; i < 5; i++) {
            if (i < coffeeInfo.profile.body) {
                dots.push(<FontAwesomeIcon key={i} icon={faSolidCircle} style={{color: "#a0522d"}} />);
            } else {
                dots.push(<FontAwesomeIcon key={i} icon={faRegularCircle} style={{color: "#a0522d"}} />);
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
                    <div className="description-container">
                        <div className="coffee-description">
                            <p>Tipo: <strong>{coffeeInfo.category}</strong></p>
                            <p>Origine: <strong>{coffeeInfo.origin}</strong></p>
                            <p>Altitudine: <strong>{coffeeInfo.altitude} mt.</strong></p>
                            <p>Varietà: <strong>{coffeeInfo.variety.join(", ")}</strong></p>
                            <p>Processo di lavorazione: <strong>{coffeeInfo.process}</strong></p>
                        </div>

                        <div className="coffee-profile">                        
                            <p>Livello acidità: <strong>{acidityDotsLevel()}</strong></p>
                            <p>Livello dolcezza: <strong>{sweetnessDotsLevel()}</strong></p>
                            <p>Struttura corpo: <strong>{bodyDotsLevel()}</strong></p>
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
                onClick={() => {
                    if (isFavourites(coffeeInfo.id)) {
                        removeFromFavourites(coffeeInfo.id);
                    } else {
                        addToFavourites(coffeeInfo.id);
                    };
                }}
            >
                {handleFavourites(coffeeInfo.id)}
            </button>
        </div>
    );
};

export default React.memo(SingleCoffee);