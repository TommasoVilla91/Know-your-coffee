import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faSolidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faRegularBookmark } from "@fortawesome/free-regular-svg-icons";

function CoffeeArea({ c }) {
    const { addToFavourites, removeFromFavourites, favourites } = useGlobalContext();

    const navigate = useNavigate();

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

    return (
        <>
            <div className="coffee-card">
                <div onClick={() => navigate(`/specialtycoffees/${c.id}`)}>
                    <div className="card-body">
                        <h2>{c.title}</h2>
                        <p className="title-category">{c.category}</p>
                    </div>
                </div>
                <button
                    className="favourites-btn"
                    onClick={() => {
                        if (isFavourites(c.id)) {
                            removeFromFavourites(c.id);
                        } else {
                            addToFavourites(c.id);
                        };
                    }}
                >
                    {handleFavourites(c.id)}
                </button>
            </div>
        </>
    );
};

export default React.memo(CoffeeArea);