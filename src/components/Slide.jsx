import cover from "../assets/over.png";
import tow from "../assets/tow.png";
export default function Slide() {
    return (
        <div>
            {/* <img src={cover} alt="" /> */}
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <img src={cover} className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle">
                            ❮
                        </a>
                        <a href="#slide2" className="btn btn-circle">
                            ❯
                        </a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img src={tow} className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">
                            ❮
                        </a>
                        <a href="#slide3" className="btn btn-circle">
                            ❯
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
