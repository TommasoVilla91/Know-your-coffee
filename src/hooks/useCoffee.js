import { useEffect, useState } from "react";

function useCoffee() {
    const api = import.meta.env.VITE_API_URL;
    const [coffeeList, setCoffeeList] = useState([]);

    useEffect(() => {
        getCoffeeList();
    }, []);

    // Funzione per recuperare la lista dei caffè
    const getCoffeeList = async () => {
        try {
            const response = await fetch(`${api}/specialtycoffees`);
            if (!response.ok) {
                throw new Error("Errore nella risposta della rete");
            }
            const data = await response.json();
            setCoffeeList(data);
        } catch (error) {
            console.error("Errore durante il recupero dei dati:", error);
        };
    };

    // Funzione per mostrare il singolo caffè
    const showCoffee = async (id) => {        
        const response = await fetch(`${api}/specialtycoffees/${id}`);
        if (!response.ok) {
            throw new Error("Errore nella risposta della rete");
        }
        const data = await response.json();
        return data;
    };

    return {
        coffeeList,
        showCoffee,
    };
};

export default useCoffee;