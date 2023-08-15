import styles from './SideBar.module.css'
import Logo from "./Logo"
import { AppNav } from "./AppNav"
export const SideBar = ()=>{


    return (
        <div className={styles.sidebar}>
        <Logo/>
        <AppNav/>
        <p1>List Of Cities</p1>
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                &copy; Copyright {new Date().getFullYear} by oo-ng inc.
            </p>     
        </footer>
        </div>
    )
}