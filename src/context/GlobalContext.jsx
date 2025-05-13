import { createContext, useCallback, useContext, useState } from "react";
import useCoffee from "../hooks/useCoffee";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    
    const {coffeeList, getCoffeeList, showCoffee} = useCoffee();
    const [showFavorites, setShowFavorites] = useState(false);
    const [favourites, setFavourites] = useState([]);

    // Funzione per aggiungere un caffè ai preferiti
    const addToFavourites = useCallback((coffeeId) => {
        if (!favourites.includes(coffeeId)) {
            setFavourites([...favourites, coffeeId]);
        } else {
            alert("Caffè già nei preferiti!");
        };
    }, [favourites]);

    // Funzione per rimuovere un caffè dai preferiti
    const removeFromFavourites = useCallback((coffeeId) => {
        setFavourites(favourites.filter(id => id !== coffeeId));
    }, [favourites]);

    const providerValue = {
        // funzioni e stati globali
        coffeeList,
        getCoffeeList,
        showCoffee,
        showFavorites,
        setShowFavorites,
        addToFavourites,
        favourites,
        removeFromFavourites
    };

    return <GlobalContext.Provider value={providerValue}>{children}</GlobalContext.Provider>;
};

function useGlobalContext() {
    return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };