import "./Popup.css"

const Popup = (error:any, open:boolean, onClose:any) => {
    if(!open) return null;
    return(
        <div className={open ? "Popup Active" : "Popup"}>
            
            <div>
                aaaaaaaaaaaaaaaaaa
            </div>
            <button onClick={onClose}></button>
        </div>
    );
};

export default Popup;