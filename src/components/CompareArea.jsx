import ComparedCoffee from "./ComparedCoffee";
import ActualCoffee from "./ActualCoffee";

function CompareArea({ show, actualCoffee, id }) {    

    return show && (
        <section className="compare">
            <div className="compare-container">
                <div>
                    <h1>Confronta i caffè</h1>
                    <h3>Compara un altro dei nostri caffè con {actualCoffee.specialtycoffee.title}</h3>
                </div>
                <div className="compare-area">                    
                    <ActualCoffee
                        coffeeOne={actualCoffee.specialtycoffee}
                    />

                    <ComparedCoffee
                        id={id}
                        coffeeOne={actualCoffee.specialtycoffee}
                    />
                </div>
            </div>
        </section>
    );
};

export default CompareArea;