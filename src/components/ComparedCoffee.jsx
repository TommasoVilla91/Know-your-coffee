import { useEffect, useMemo, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function ComparedCoffee({ coffeeOne, id }) {

    const { coffeeList, showCoffee, toggleFavorites, handleFavourites, comparatorDotsLevelManager, showComparedCoffee, setShowComparedCoffee } = useGlobalContext();
    const [selectedId, setSelectedId] = useState("none");
    const [selectedCoffee, setSelectedCoffee] = useState(null);

    const numId = parseInt(selectedId);

    // Chiamata fetch alla selezione del caffe dal select
    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await showCoffee(numId);
                setSelectedCoffee(data);
            } catch (error) {
                console.error("Errore durante il recupero dei dettagli del caffè:", error);
            };
        };
        fetch();
    }, [numId]);

    // Filtro lista dei caffè per escludere il caffè attualmente selezionato
    const filteredSelector = useMemo(() => {
        return coffeeList.filter(c => c.id !== id);
    }, [coffeeList, numId, id]);

    // Selezionatore per il caffè da confrontare
    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === "none") {
            setShowComparedCoffee(false);
        } else {
            setShowComparedCoffee(true);
            setSelectedId(selectedValue);
        };
    };

    const handleLinkClick = () => {
        setShowComparedCoffee(false);
        setSelectedId("none");
    };

    return (
        <>
            <div className="other-coffee">
                <select
                    className="compare-select"
                    onChange={handleSelectChange}
                >
                    <option value="none">Seleziona un caffè</option>
                    {filteredSelector.map((coffee) => (
                        <option key={coffee.id} value={coffee.id}>
                            {coffee.title}
                        </option>
                    ))}
                </select>

                {showComparedCoffee && selectedCoffee ? (
                    <div className="compared-coffee" key={selectedCoffee.id}>

                        <Link to={`/specialtycoffees/${numId}`} onClick={handleLinkClick}>

                            <h3>{selectedCoffee.specialtycoffee.title}</h3>
                            <FontAwesomeIcon icon={faLink} style={{ color: "#a0522d" }} />
                            
                        </Link>

                        <div className="coffee-description">
                            <p><span>Tipo: </span>
                                <strong style={{ color: selectedCoffee.specialtycoffee.category === coffeeOne.category ? "green" : "red" }}>
                                    {selectedCoffee.specialtycoffee.category}
                                </strong>
                            </p>
                            <p><span>Origine: </span>
                                <strong style={{ color: selectedCoffee.specialtycoffee.origin === coffeeOne.origin ? "green" : "red" }}>
                                    {selectedCoffee.specialtycoffee.origin}
                                </strong>
                            </p>
                            <p><span>Altitudine: </span>
                                <strong>
                                    <span style={{
                                        color: selectedCoffee.specialtycoffee.altitude > coffeeOne.altitude ? "green" :
                                            selectedCoffee.specialtycoffee.altitude < coffeeOne.altitude ? "red" : "#a0522d"
                                    }}>
                                        {selectedCoffee.specialtycoffee.altitude} mt.</span>
                                </strong>
                            </p>
                            <p><span>Varietà: </span>
                                <strong>
                                    {selectedCoffee.specialtycoffee.variety.map((v, i) => (
                                            <span key={i} style={{ color: coffeeOne.variety.includes(v) ? "green" : "red" }}>
                                                {v}
                                                {i < selectedCoffee.specialtycoffee.variety.length - 1 ? ", " : ""}
                                            </span>
                                    ))}
                                </strong>
                            </p>
                            <p><span>Tipologia di chicco: </span>
                                <strong style={{ color: selectedCoffee.specialtycoffee.bean === coffeeOne.bean ? "green" : "red" }}>
                                    {selectedCoffee.specialtycoffee.bean}
                                </strong>
                            </p>
                        </div>

                        <div className="coffee-profile">
                            <span className="taste"><p>Sentori: </p>
                                <strong>
                                    {selectedCoffee.specialtycoffee.profile.flavours.map((f, i) => (
                                            <span key={f} style={{ color: coffeeOne.profile.flavours.includes(f) ? "green" : "red" }}>
                                                {f}
                                                {i < selectedCoffee.specialtycoffee.profile.flavours.length - 1 ? ", " : ""}
                                            </span>
                                    ))}
                                </strong>
                            </span>
                            <p><span>Livello acidità: </span>
                                {comparatorDotsLevelManager(coffeeOne.profile.acidity, selectedCoffee.specialtycoffee.profile.acidity)}
                            </p>
                            <p><span>Livello dolcezza: </span>
                                {comparatorDotsLevelManager(coffeeOne.profile.sweetness, selectedCoffee.specialtycoffee.profile.sweetness)}
                            </p>
                            <p><span>Struttura corpo: </span>
                                {comparatorDotsLevelManager(coffeeOne.profile.body, selectedCoffee.specialtycoffee.profile.body)}
                            </p>
                        </div>
                        <p className='comapared-price'><span>Prezzo: </span>
                            <strong style={{ color: selectedCoffee.specialtycoffee.price > coffeeOne.price ? "red" : "green" }}>
                                {selectedCoffee.specialtycoffee.price.toFixed(2)}€
                            </strong>
                        </p>
                        <button
                            className="favourites-btn"
                            onClick={() => toggleFavorites(selectedCoffee.specialtycoffee.id)}
                        >
                            {handleFavourites(selectedCoffee.specialtycoffee.id)}
                        </button>
                    </div>
                ) : (
                    <p></p>
                )}

            </div>
        </>
    );
};

export default ComparedCoffee;