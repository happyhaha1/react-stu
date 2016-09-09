/**
 * @author happyhaha
 * Created on 2016-09-08 17:45
 */
import React, { Component, PropTypes } from 'react'

class Counter extends Component {
    render() {
        //从组件的props属性中导入四个方法和一个变量
        const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
        //渲染组件，包括一个数字，四个按钮
        return (
            <p>
                Clicked: {counter} times
                {' '}
                <button onClick={increment}>+</button>
                {' '}
                <button onClick={decrement}>-</button>
                {' '}
                <button onClick={incrementIfOdd}>Increment if odd</button>
                {' '}
                <button onClick={() => incrementAsync()}>Increment async</button>
            </p>
        )
    }
}
//限制组件的props安全
Counter.propTypes = {
    //increment必须为fucntion,且必须存在
    increment: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    //counter必须为数字，且必须存在
    counter: PropTypes.number.isRequired
};

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CounterActions from '../actions/counter'


//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(state => ({
    counter: state.counter
}), dispatch => (
    bindActionCreators(CounterActions, dispatch)
))(Counter)