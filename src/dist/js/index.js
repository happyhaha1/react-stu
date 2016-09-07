/**
 * @author happyhaha
 * Created on 2016-09-07 09:25
 */
import React from "react";
import ReactDOM, { render } from "react-dom";
import style from "../css/index.css";
import bg from "../img/bg.jpg";
import bg2 from "../img/bg2.jpg";


class Hello extends React.Component {
    constructor(props) {
        super(props);
    }

    click() {
        $("."+style.photo).attr("src",bg2);
        console.log(style.photo);
    }

    render() {
        return (
            <div className="MyComponent-wrapper">
                <h1>Hello world</h1>
                <img className={style.photo} onClick={this.click} src={bg}/>
            </div>
        );
    }
}

ReactDOM.render(<Hello/>,document.getElementById('demo'));