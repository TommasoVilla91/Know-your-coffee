import { useGlobalContext } from "../context/GlobalContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CoffeeArea from "../components/CoffeeArea";

function CoffeeList() {

    const { coffeeList, categories } = useGlobalContext();
    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState("1");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const searchRef = useRef();

    useEffect(() => {
        searchRef.current.focus();
    }, []);

    // Funzione debounce di supporto
    function debounce(func, delay) {
        let timer;
        return (value) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(value);
            }, delay);
        };
    };

    // Debounce per ritardare la comparsa del risultato della ricerca
    const handleSearch = useCallback(
        debounce(setSearchQuery, 500)
    , []);

    // Gestione del click sul bottone di ordinamento
    const handleSort = (param) => {
        sortBy === param ? setSortOrder(-sortOrder) : setSortBy(param) && setSortOrder(1);
    };

    // Gestione dell'ordine e della tipologia degli elementi da mostare in pagina sulla base dell'interazione dell'utente
    const sortedCoffees = useMemo(() => {
        // Filtraggio condizioni se preme select, ordinamento per nome o se digita nella search-bar
        const filteredCoffees = coffeeList.filter(c => {
            const query = searchQuery.toLowerCase();
            const title = c.title.toLowerCase();
            const category = c.category.toLowerCase();
            if (query) {
                return title.includes(query) || category.includes(query);
            } else if (selectedCategory === "all") {
                return true;
            } else {
                return c.category === selectedCategory;
            };
        });

        // Elementi che deve restiture in pagina
        return [...filteredCoffees].sort((a, b) => a.title.localeCompare(b.title) * sortOrder);
        
    }, [coffeeList, sortBy, sortOrder, selectedCategory, searchQuery]);

    // Gestione frecce per far capire meglio l'ordine degli elementi all'utente
    const sortIcon = sortOrder === 1 ? '▲' : '▼';

    return (
        <div className="coffee-list-container">
            <section className="search-items">
                <div className="searchbar-container">
                    <h3>Cerca il tuo caffè</h3>
                    <input
                        type="text"
                        className="searchbar"
                        placeholder="Cerca un caffè"
                        onChange={e => handleSearch(e.target.value)}
                        ref={searchRef}
                    />
                </div>
                <div className="sort">
                    <div className="sort-btns">
                        <button
                            className="alphabetc-btn"
                            onClick={() => handleSort("title")}
                        >
                            Nome {sortIcon}
                        </button>
                        <select
                            className="categories-select"
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                        >
                            <option value="all">Tutti i processi di essicazione</option>
                            {categories.map((category, i) => (
                                <option key={i} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <button 
                            className="reset"
                            onClick={() => {
                                setSortBy("title");
                                setSortOrder(1);
                                setSelectedCategory("all");
                                setSearchQuery("");
                                searchRef.current.focus();
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </section>

            
            <section className="coffee-list">
                {sortedCoffees.length > 0 ? (
                    sortedCoffees.map((coffee) => (
                        <CoffeeArea
                            key={coffee.id}
                            c={coffee}
                        />
                    ))
                ) : (
                    <p>Nessun prodotto disponibile al momento.</p>
                )}
            </section>
        </div>
    );
};

export default CoffeeList;