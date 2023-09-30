/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom"
import styles from "./PageNav.module.css"
import Logo from "./Logo"
import { useCities } from "./context/citiesProvider"
import { useNavigate } from "react-router-dom"

export const PageNav =()=>{
    const navigate = useNavigate();
    const {LoggedIn, Signout, username}=useCities();
    const handleSignoutbuttonClick = () =>{
        Signout();
        setTimeout(()=>{
            navigate('/');
        },1000)
      
    }
    return (
        
        <nav className={styles.nav}>
            <Logo/>
            {console.log(LoggedIn)}
            <ul >
                <li>
                    <NavLink to="/product">Products</NavLink>
                </li>
                <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                
                
                {
                    LoggedIn ? (
                        <> 
                            <li>
                            <span className={styles.welcomeText}>Welcome, {username}</span>
                            </li>
                            <button
                            onClick={handleSignoutbuttonClick}
                            className={styles.signout}
                            >SIGN OUT</button>
                        </>
                    ) : (
                        <li>
                            <NavLink className={styles.ctaLink} to="/login">Login</NavLink>
                        </li>
                    )
                }

            </ul>
        </nav>
    )
}