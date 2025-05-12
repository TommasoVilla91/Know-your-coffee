import { useParams } from "react-router-dom"
import { useGlobalContext } from "../context/GlobalContext";
import { useEffect, useState } from "react";
import CompareArea from "../components/CompareArea";
import SingleCoffee from "../components/SingleCoffee";

function CoffeeDetails() {

    const { id } = useParams();
    const { showCoffee } = useGlobalContext();
    const [singleCoffee, setSingleCoffee] = useState(null);
    const [showCompare, setShowCompare] = useState(false);

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
        <div className="coffee-details-page">
            <section className="coffee-details-container">
                {singleCoffee ? (

                    <SingleCoffee 
                        coffeeInfo={singleCoffee.specialtycoffee}
                    />
                ) : (
                    <p className="loading-message">Caricamento in corso...</p>
                )}

            </section>
            <div className="coffee-details-btn">
                <button
                    className="compare-btn"
                    onClick={() => setShowCompare(true)}
                >
                    Compara
                </button>
            </div>
            
            <CompareArea
                show={showCompare}
                actualCoffee={singleCoffee}
                id={id}
            />
        </div>
    );
};

export default CoffeeDetails;