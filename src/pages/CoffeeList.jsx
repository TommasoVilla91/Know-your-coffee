import { useGlobalContext } from "../context/GlobalContext";

function CoffeeList() {

    const { coffeeList } = useGlobalContext();
    console.log(coffeeList);
      

    return (
        <div>
            <section className="coffee-list">
                {coffeeList.length > 0 ? (
                    coffeeList.map((coffee) => (
                        <div key={coffee.id} className="coffee-card">
                            <div className="card-image">
                                <img src={coffee.image} alt="coffe image" />
                            </div>
                            <div className="card-body">
                                <h2>{coffee.title}</h2>
                                <p className="title-category">{coffee.category}</p>
                                <p>{coffee.flavours}</p>
                                <p>Origine: {coffee.origin}</p>
                                <p>Prezzo: {coffee.price}€</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nessun caffè disponibile al momento.</p>
                )}
            </section>
        </div>
    );
};

export default CoffeeList;