//Contener układu strony logowania 
// lewy box dekoracyjny + prawy box z formularzem

import LoginSlider from "./LoginSlider";
import LoginCard from "./LoginCard";

export default function LoginLayout() {

return ( 
<div className="container-fluid login-main-container"> 
    <div className="row">
    {/* Lewa część - slider */} 
        <div className="col-md-6 login-left p-0 bg-blue"> <LoginSlider /> 
        </div>

    {/* Prawa część - formularz */}
        <div className="col-md-6 login-right d-flex justify-content-center align-items-center bg-black">
            <LoginCard />
        </div>
    </div>
</div>
);


}
