import { useParams } from "react-router-dom"
import { useGlobalContext } from "../context/GlobalContext";
import { useEffect, useState } from "react";

function CoffeeDetails() {

    const { id } = useParams();
    const { showCoffee } = useGlobalContext();
    const [singleCoffee, setSingleCoffee] = useState(null);
    
    const numId = parseInt(id);

    useEffect(() => {
        const fetchCoffee = async () => {
            try {
                const data = await showCoffee(numId);
                setSingleCoffee(data);
            } catch (error) {
                console.error("Errore durante il recupero dei dettagli del caffè:", error);
            };
        };
        fetchCoffee();
    }, [id]);    


    return (
        <div className="coffee-details-container">
            {singleCoffee ? (
                <div className="coffee-details">
                    <h1>{singleCoffee.specialtycoffee.title}</h1>
                    <div className="coffee-details-image">
                        <div>
                            <img src={singleCoffee.specialtycoffee.image} alt={singleCoffee.specialtycoffee.title} />
                        </div>
                        <div className="coffee-details-body">
                            <div className="coffee-description">
                                <p>Tipo: <strong>{singleCoffee.specialtycoffee.category}</strong></p>
                                <p>Origine: <strong>{singleCoffee.specialtycoffee.origin}</strong></p>
                                <p>Altitudine: <strong>{singleCoffee.specialtycoffee.altitude}</strong></p>
                                <p>Varietà: <strong>{singleCoffee.specialtycoffee.variety.join(", ")}</strong></p>
                                <p>Processo di lavorazione: <strong>{singleCoffee.specialtycoffee.process}</strong></p>
                            </div>
                            <div className="coffee-profile">
                                <p>Sentori: <strong>{singleCoffee.specialtycoffee.profile.flavours.join(", ")}</strong></p>
                                <p>Livello acidità: <strong>{singleCoffee.specialtycoffee.profile.acidity}</strong></p>
                                <p>Livello dolcezza: <strong>{singleCoffee.specialtycoffee.profile.sweetness}</strong></p>
                                <p>Struttura: <strong>{singleCoffee.specialtycoffee.profile.body}</strong></p>
                            </div>
                            <div>
                                <p>Prezzo: <strong>{singleCoffee.specialtycoffee.price.toFixed(2)}€</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="loading-message">Caricamento in corso...</p>
            )}
        </div>
    )
}

export default CoffeeDetails;