import './pageNotFound.css';
const PageNotFound = () => {
    return ( 
        <div className="pagenotfound-container">
            <img src="/src/assets/404.svg" alt="404" className="pagenotfound-img" />
            <button className="pagenotfound-btn">Back to Home</button>
        </div>
    );
};


export default PageNotFound