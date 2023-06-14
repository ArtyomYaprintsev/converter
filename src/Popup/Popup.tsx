import { Dispatch, SetStateAction } from "react";
import "./Popup.css"

// const Popup = (active:boolean, setActive:Dispatch<SetStateAction<boolean>>, error:string) => {
const Popup = (props:any) => {
    return(props.active) ? (
        <div className="Popup"> 
            <div className="Content">
                <h2>{props.error.properties.adress} {props.error.properties.description} error</h2>
                <p>{props.error.properties.message}</p>
                <button className="Button" onClick={()=>props.setActive(false)}>Хорошо, переделаю</button>
            </div>
        </div>
    ) : <span></span>
};

export default Popup;