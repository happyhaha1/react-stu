/**
 * @author happyhaha
 * Created on 2016-09-07 09:25
 */
import React from "react";
import ReactDOM, { render } from "react-dom";
import style from "../css/common/common.css";
import bg from "../img/bg.jpg";
import Data from "../data/data.json";

import 'whatwg-fetch'
import { DatePicker, message } from 'antd';
class Hello extends React.Component {
    constructor(props) {
        super(props);
    }

    click() {
        // const srcDir = path.resolve(process.cwd(),'src');
        //
        // var dir = fs.readdirSync(srcDir);
        // console.log(dir);
        fetch(Data)
            .then((res) => { console.log(res.status);return res.json() })
            .then((data) => { console.log(data) })
            .catch((e) => { console.log(e.message) })

    }

    render() {
        return (
            <div className={style.photo}>
                <h1>Hello world</h1>
                <img className="happy" onClick={this.click} src={bg}/>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
        };
    }
    handleChange(date) {
        message.info('您选择的日期是: ' + date.toTimeString());
        this.setState({ date });
    }
    render() {
        return (
            <div style={{ width: 400, margin: '100px auto' }}>
                <DatePicker onChange={value => this.handleChange(value)} />
                <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
            </div>
        );
    }
}

ReactDOM.render(<Hello/>,document.getElementById('demo'));