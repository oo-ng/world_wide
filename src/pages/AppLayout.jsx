// import { AppNav } from "../components/AppNav"
import styles from './AppLayout.module.css'
import { Map } from "../components/Map"
import { SideBar } from '../components/SideBar'
export const AppLayout =()=>{

    return(
        <div className={styles.app}>
            <SideBar />
            <Map/>
        </div>
    )
}