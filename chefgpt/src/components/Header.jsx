import logo from "../assets/logo-icon.png"

export default function Header(){
    return(
        <>
            <header className="header">
                <img className="logo-img" src={logo} alt="logo image"/>
                <span>Chefgpt</span>
            </header>
            <hr />
        </>
    )
}