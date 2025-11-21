import { useState } from "react";
import slide1 from "../../assets/images/96b.jpg";
import slide2 from "../../assets/images/hema.jpg";

const slides = [slide1, slide2];

export default function LoginSlider() {
const [index, setIndex] = useState(0);


const prev = () => setIndex((index - 1 + slides.length) % slides.length);
const next = () => setIndex((index + 1) % slides.length);

return (
    <div className="login-slider">
        <img 
            src={slides[index]} 
            alt="slide" 
            className="login-slide-img"
            style={{ width: "100%", height: "auto", display: "block" }} // POPRAWA: dopasowanie do kontenera
        />

        <div className="login-slider-controls">
            <button onClick={prev}>{"<"}</button>
            <button onClick={next}>{">"}</button>
        </div>
    </div>
);

}
