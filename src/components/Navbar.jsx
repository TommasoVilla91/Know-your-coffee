import { NavLink } from "react-router-dom";

function Navbar() {

    const navLinks = [
        { title: "Home", path: "/" },
        { title: "Preferiti", path: "/favorites" },
    ] 

    return (
        <nav className="navbar">
            {navLinks.map((link, i) => (
                <NavLink key={i} to={link.path} className="nav-link">
                    {link.title}
                </NavLink>
            ))}
        </nav>
    );
};

export default Navbar;