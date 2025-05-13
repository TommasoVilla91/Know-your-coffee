import ReactDOM from 'react-dom';
import { useGlobalContext } from '../context/GlobalContext';
import { useEffect, useState } from 'react';

function FavoritesModal({ show, title, onClose }) {

    const { favourites, removeFromFavourites, showCoffee } = useGlobalContext();
    const [favList, setFavList] = useState([]);

    useEffect(() => {
        const favPromises = favourites.map(f => {
            return showCoffee(f);
        });

        Promise.all(favPromises)
            .then(res => setFavList(res))
            .catch(err => console.error("Errore nel recupero dei preferiti!", err));

    }, [favourites]);

    return show && ReactDOM.createPortal(
        <div className="favourites-modal">
            <div className='modal-content'>
                <h1 className='modal-title'>{title}</h1>
                <button className='close-btn' onClick={onClose}>X</button>
                <div className='modal-row'>
                {favList.length > 0 ? (
                    favList.map(f => (
                            <div className='fav-card'>
                                <h3>{f.specialtycoffee.title}</h3>
                                <p>{f.specialtycoffee.category}</p>
                                <p>{f.specialtycoffee.price.toFixed(2)} €</p>
                                <button className='remove-btn' onClick={() => removeFromFavourites(f.specialtycoffee.id)}>Rimuovi</button>
                            </div>
                    ))
                ) : (
                    <p>Non ci sono ancora caffè salvati tra i preferiti</p>
                )}
                </div>
            </div>
        </div>
        , document.body
    );
};

export default FavoritesModal;