export default function StatusBar({img, title, count}){
    return(
            <div className="status-bar d-flex align-items-center">
                <div>
                <img src={img} alt="coachsparkle"/>
                </div>
                <div>
                <h4>{title}</h4>
                <span><strong>{count}</strong></span>
                </div>
            </div>
    );
}