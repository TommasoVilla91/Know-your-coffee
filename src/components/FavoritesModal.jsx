import ReactDOM from 'react-dom';
import { useGlobalContext } from '../context/GlobalContext';

function FavoritesModal({ show, title, onClose }) {

    const { favourites, removeFromFavourites } = useGlobalContext();

    return show && ReactDOM.createPortal (
        <div className="favourites-modal">
            <h2>{title}</h2>
            
        </div>
        ,document.body
    );
};

export default FavoritesModal;