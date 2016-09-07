/**
 * @author happyhaha
 * Created on 2016-09-07 09:25
 */
import React from "react";
import ReactDOM, { render } from "react-dom";

class Hello extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Hello,World!!!!</div>
        );
    }
}

ReactDOM.render(<Hello/>,document.getElementById('demo'));