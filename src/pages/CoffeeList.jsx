import { useGlobalContext } from "../context/GlobalContext";
import { useCallback, useMemo, useState } from "react";
import CoffeeArea from "../components/CoffeeArea";

function CoffeeList() {

    const { coffeeList } = useGlobalContext();
    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState("1");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    function debounce(func, delay) {
        let timer;
        return (value) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(value);
            }, delay);
        };
    };    

    const handleSearch = useCallback(
        debounce(setSearchQuery, 500)
        , []);

    const categories = useMemo(() => {
        let uniqueCategories = [];
        coffeeList.forEach((coffee) => {
            if (!uniqueCategories.includes(coffee.category)) {
                uniqueCategories.push(coffee.category);
            };
        });
        return uniqueCategories;
    }, [coffeeList]);

    const sortIcon = sortOrder === 1 ? '▼' : '▲';

    const handleSort = (btn) => {
        sortBy === btn ? setSortOrder(-sortOrder) : setSortBy(btn) && setSortOrder(1);
    };

    const sortedCoffees = useMemo(() => {
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

        if (sortBy === "title") {
            return [...filteredCoffees].sort((a, b) => a.title.localeCompare(b.title) * sortOrder);
        } else if (sortBy === "category") {
            return [...filteredCoffees].sort((a, b) => a.category.localeCompare(b.category) * sortOrder);
        } else if (sortBy !== "title" && sortBy !== "category") {
            return filteredCoffees;
        };
    }, [coffeeList, sortBy, sortOrder, selectedCategory, searchQuery]);

    return (
        <div>
            <section className="search-items">
                <div className="searchbar-container">
                    <h3>Cerca il tuo caffè</h3>
                    <input
                        type="text"
                        className="searchbar"
                        placeholder="Cerca un caffè"
                        onChange={e => handleSearch(e.target.value)}
                    />
                </div>
                <div className="sort">
                    <h5>Ordina per</h5>
                    <div className="sort-btns">
                        <button
                            className="alphabetc-btn"
                            onClick={() => handleSort("title")}
                        >
                            Nome {sortBy === "title" && sortIcon}
                        </button>
                        <select
                            className="categories-select"
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                        >
                            <option value="all">Tutte le varietà</option>
                            {categories.map((category, i) => (
                                <option key={i} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
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