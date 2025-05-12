import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import FavoritesModal from "./FavoritesModal";

function Navbar() {

    const { showFavorites, setShowFavorites, favourites } = useGlobalContext();

    const navLinks = [
        { title: "Home", path: "/" }
    ];

    return (
        <>
            <nav className="navbar">
                {navLinks.map((link, i) => (
                    <NavLink key={i} to={link.path} className="nav-link">
                        {link.title}
                    </NavLink>
                ))}
                <div 
                    className="nav-link"
                    onClick={() => setShowFavorites(true)}>
                        <span>Preferiti </span>
                        {favourites.length > 0 && <span className="favourites-count">{favourites.length}</span>}
                </div>
            </nav>
            
            <section>
                <FavoritesModal 
                    show={showFavorites}
                    title="Preferiti"
                    onClose={() => setShowFavorites(false)}
                />
            </section>
        </>
    );
};

export default Navbar;