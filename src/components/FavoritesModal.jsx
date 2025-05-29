import ReactDOM from 'react-dom';
import { useGlobalContext } from '../context/GlobalContext';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function FavoritesModal({ show, title, onClose }) {

    const { favourites, removeFromFavourites, showCoffee } = useGlobalContext();
    const [favList, setFavList] = useState([]);

    // Chiamata fetch per recuperare tutti i caffe salvati nell'array dei preferiti
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

                <h1>{title}</h1>
                <button className='close-btn' onClick={onClose}>X</button>
                
                <div className='modal-row'>
                    {favList.length > 0 ? (
                        favList.map(f => (
                            <div key={f.specialtycoffee.id} className='fav-card'>

                                <div>
                                    <Link to={`/specialtycoffees/${f.specialtycoffee.id}`} onClick={onClose}>
                                        <h3>{f.specialtycoffee.title}</h3>
                                    </Link>
                                    <p className='process'>{f.specialtycoffee.category}</p>
                                </div>

                                <p>{f.specialtycoffee.price.toFixed(2)} €</p>

                                <button className='remove-btn' onClick={() => removeFromFavourites(f.specialtycoffee.id)}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>

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