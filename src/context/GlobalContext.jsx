import { createContext, useCallback, useContext, useMemo, useState } from "react";
import useCoffee from "../hooks/useCoffee";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faSolidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faRegularBookmark } from "@fortawesome/free-regular-svg-icons";
import { faCircle as faSolidCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as faRegularCircle } from '@fortawesome/free-regular-svg-icons';

const GlobalContext = createContext();

function GlobalProvider({ children }) {

    const { coffeeList, getCoffeeList, showCoffee } = useCoffee();
    const [showFavorites, setShowFavorites] = useState(false);
    const [favourites, setFavourites] = useState([]);

    // Funzione per ottenere tutte le varità di caffè
    const categories = useMemo(() => {
        let uniqueCategories = [];
        coffeeList.forEach((coffee) => {
            if (!uniqueCategories.includes(coffee.category)) {
                uniqueCategories.push(coffee.category);
            };
        });
        return uniqueCategories;
    }, [coffeeList]);

    // Gestione icone dei preferiti
    const handleFavourites = useCallback((id) => {
        if (favourites.some(f => f === id)) {
            return <FontAwesomeIcon icon={faSolidBookmark} />;
        } else {
            return <FontAwesomeIcon icon={faRegularBookmark} />;
        };
    }, [favourites]);

    // Funzione per verificare se un caffè è nei preferiti
    const isFavourites = useCallback((id) => {favourites.some(f => f === id)}, [favourites]);

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

    // Funzioni per generare i grafico a punti per i profili di caffè
    const comparatorDotsLevelManager = useCallback((coffeLeft, coffeeRight) => {
        const color = coffeLeft > coffeeRight ? "green" :
            coffeLeft < coffeeRight ? "red" : "#a0522d";

        let dots = [];
        for (let i = 0; i < 5; i++) {
            dots.push(
                <FontAwesomeIcon 
                    key={i}
                    icon={i < coffeLeft ? faSolidCircle : faRegularCircle}
                    style={{color: color}}
                />
            );
        };
        return dots;
    }, [])

    const dotsLevelManager = useCallback((level) => {
        let dots = [];
        for (let i = 0; i < 5; i++) {
            dots.push(
                <FontAwesomeIcon
                    key={i}
                    icon={i < level ? faSolidCircle : faRegularCircle}
                    style={{ color: "#a0522d" }}
                />
            );
        };
        return dots;
    }, []);

    const providerValue = {
        // funzioni e stati globali
        coffeeList,
        getCoffeeList,
        showCoffee,
        showFavorites,
        setShowFavorites,
        addToFavourites,
        favourites,
        removeFromFavourites,
        categories,
        handleFavourites,
        isFavourites,
        dotsLevelManager,
        comparatorDotsLevelManager
    };

    return <GlobalContext.Provider value={providerValue}>{children}</GlobalContext.Provider>;
};

function useGlobalContext() {
    return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };