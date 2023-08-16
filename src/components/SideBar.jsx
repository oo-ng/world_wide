import styles from './SideBar.module.css'
import Logo from "./Logo"
import { AppNav } from "./AppNav"
import { Outlet } from 'react-router-dom'
export const SideBar = ()=>{


    return (
        <div className={styles.sidebar}>
        <Logo/>
        <AppNav/>
        <Outlet/>
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                &copy; Copyright {new Date().getFullYear} by oo-ng inc.
            </p>     
        </footer>
        </div>
    )
}