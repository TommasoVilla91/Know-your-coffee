import { createContext, useContext } from "react";
import useCoffee from "../hooks/useCoffee";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    
    const {coffeeList, getCoffeeList, showCoffee} = useCoffee();

    const providerValue = {
        // funzioni e stati globali
        coffeeList,
        getCoffeeList,
        showCoffee,
    };

    return <GlobalContext.Provider value={providerValue}>{children}</GlobalContext.Provider>;
};

function useGlobalContext() {
    return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };