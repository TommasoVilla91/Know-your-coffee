import React from "react";
import { Link } from "react-router-dom";

function CoffeeArea({ c }) {
    return (
        <>
            <Link to={`/specialtycoffees/${c.id}`} className="coffee-card">
                <div>
                    <div className="card-body">
                        <h2>{c.title}</h2>
                        <p className="title-category">{c.category}</p>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default React.memo(CoffeeArea);