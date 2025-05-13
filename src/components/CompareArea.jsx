import ComparedCoffee from "./ComparedCoffee";
import ActualCoffee from "./ActualCoffee";

function CompareArea({ show, actualCoffee, id }) {

    

    return show && (
        <section className="compare">
            <div className="compare-container">
                <div>
                    <h1>Confronta i caffè</h1>
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
    )
}

export default CompareArea;