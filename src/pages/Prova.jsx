import { useRef, useState } from "react";

function Prova() {
    const [displayedQuery, setDisplayedQuery] = useState('');
    const queryRef = useRef('');

    const handleClick = () => {
        const currentInputValue = queryRef.current ? queryRef.current.value : '';
        setDisplayedQuery(currentInputValue)
    };

    console.log('Componente si sta renderizzando.');

    return (
        <div>
            <input
                type="text"
                ref={queryRef}
            />

            <button onClick={handleClick}>Mostra Query</button>

            <p>Query visualizzata: <strong>{displayedQuery}</strong></p>
        </div>
    );
}

export default Prova;