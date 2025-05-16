import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

function CoffeeArea({ c }) {
    const { addToFavourites, removeFromFavourites, isFavourites, handleFavourites } = useGlobalContext();

    const navigate = useNavigate();

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