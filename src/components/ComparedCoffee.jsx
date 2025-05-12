import { useEffect, useMemo, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle as faSolidCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as faRegularCircle } from '@fortawesome/free-regular-svg-icons';

function ComparedCoffee({ id, coffeeOne }) {

    const { coffeeList, showCoffee } = useGlobalContext();
    const [selectedId, setSelectedId] = useState("none");
    const [selectedCoffee, setSelectedCoffee] = useState(null);
    const [showComparedCoffee, setShowComparedCoffee] = useState(false);

    const numId = parseInt(selectedId);

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
    }, [selectedId]);

    // Filtro lista dei caffè per escludere il caffè attualmente selezionato
    const filteredSelector = useMemo(() => {
        return coffeeList.filter(c => c.id !== id);
    }, [coffeeList]);

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

    // Funzione per generare i grafico a punti per i profili di caffè
    const dotsLevel = () => {
        let dots = [];
        for (let i = 0; i < 5; i++) {
            if (i < selectedCoffee.specialtycoffee.profile.acidity && i < selectedCoffee.specialtycoffee.profile.sweetness && i < selectedCoffee.specialtycoffee.profile.body) {
                dots.push(<FontAwesomeIcon key={i} icon={faSolidCircle} style={{
                    color: selectedCoffee.specialtycoffee.profile.acidity > coffeeOne.profile.acidity ? "green" : "red"
                }} />);
            } else {
                dots.push(<FontAwesomeIcon key={i} icon={faRegularCircle} style={{
                    color: selectedCoffee.specialtycoffee.profile.acidity > coffeeOne.profile.acidity ? "green" : "red"
                }} />);
            };
        };
        return dots;
    };


    return (
        <>
            <div className="other-coffee">
                <select
                    className="compare-select"
                    onChange={handleSelectChange}
                >
                    <option value="none">Seleziona un caffè da confrontare</option>
                    {filteredSelector.map((coffee) => (
                        <option key={coffee.id} value={coffee.id}>
                            {coffee.title}
                        </option>
                    ))}
                </select>

                {showComparedCoffee && selectedCoffee ? (
                    <div className="compared-coffee">
                        <h3>{selectedCoffee.specialtycoffee.title}</h3>

                        <div className="coffee-description">
                            <p><span>Tipo: </span>
                                <strong style={{ color: selectedCoffee.specialtycoffee.category === coffeeOne.category ? "green" : "yellow" }}>
                                    {selectedCoffee.specialtycoffee.category}
                                </strong>
                            </p>
                            <p><span>Origine: </span>
                                <strong style={{ color: selectedCoffee.specialtycoffee.origin === coffeeOne.origin ? "green" : "yellow" }}>
                                    {selectedCoffee.specialtycoffee.origin}
                                </strong>
                            </p>
                            <p><span>Altitudine: </span>
                                <strong>
                                    <span style={{ color: selectedCoffee.specialtycoffee.altitude >= coffeeOne.altitude ? "green" : "red" }}>{selectedCoffee.specialtycoffee.altitude}</span> mt.
                                </strong>
                            </p>
                            <p><span>Varietà: </span>
                                <strong>
                                    {selectedCoffee.specialtycoffee.variety.map((v, i) => (
                                        <>
                                            <span style={{ color: coffeeOne.variety.includes(v) ? "green" : "yellow" }}>{v}</span>
                                            {i < selectedCoffee.specialtycoffee.variety.length - 1 ? ", " : ""}
                                        </>
                                    ))}
                                </strong>
                            </p>
                            <p><span>Processo di lavorazione: </span>
                                <strong style={{ color: selectedCoffee.specialtycoffee.process === coffeeOne.process ? "green" : "yellow" }}>
                                    {selectedCoffee.specialtycoffee.process}
                                </strong>
                            </p>
                        </div>

                        <div className="coffee-profile">
                            <span className="taste"><p>Sentori: </p>
                                <strong>
                                    {selectedCoffee.specialtycoffee.profile.flavours.map((f, i) => (
                                        <>
                                            <span key={f} style={{ color: coffeeOne.profile.flavours.includes(f) ? "green" : "yellow" }}>{f}</span>
                                            {i < selectedCoffee.specialtycoffee.profile.flavours.length - 1 ? ", " : ""}                                        
                                        </>
                                    ))}
                                </strong>
                            </span>
                            <p><span>Livello acidità: </span>
                                {dotsLevel()}
                            </p>
                            <p><span>Livello dolcezza: </span>
                                {dotsLevel()}
                            </p>
                            <p><span>Struttura corpo: </span>
                                {dotsLevel()}
                            </p>
                        </div>
                        <p><span>Prezzo: </span>
                            <strong style={{ color: selectedCoffee.specialtycoffee.price > coffeeOne.price ? "red" : "green" }}>
                                {selectedCoffee.specialtycoffee.price.toFixed(2)}€
                            </strong>
                        </p>
                    </div>
                ) : (
                    <p></p>
                )}

            </div>
        </>
    );
};

export default ComparedCoffee;