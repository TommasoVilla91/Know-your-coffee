import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
const api = import.meta.env.VITE_API_URL

function GlobalProvider({ children }) {
    const[coffeeList, setCoffeeList] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${api}/specialtycoffees`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setCoffeeList(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }            
        })();     
    }, []);

    const providerValue = {
        // funzioni e stati globali
        coffeeList,
    };

    return <GlobalContext.Provider value={providerValue}>{children}</GlobalContext.Provider>;
};

function useGlobalContext() {
    return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };