import logo from "./saketa-logo.svg";
import defaultUser from "./default-user.png";
import  "./header.css";
const Header = () => {
    return (
        <div className="container">
            <div className="header-outer">
                <div className="logo">
                    <img src={logo} alt="saketa logo"/>
                </div>
                <div className="profile-block">
                    <b>Arun Sai gandham</b>
                    <img src={defaultUser} alt="loading user profiile image"/>
                </div>
            </div>
        </div>
    );
}
 
export default Header;