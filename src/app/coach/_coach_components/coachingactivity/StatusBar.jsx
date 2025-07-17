export default function StatusBar({img, title, count}){
    return(
            <div className="status-bar d-flex align-items-center gap-1">
                <div>
                <img src={img} alt="coachsparkle"/>
                </div>
                <div>
                <h4 className="coaching-tittle-text">{title}</h4>
                <span><strong>{count}</strong></span>
                </div>
            </div>
    );
}