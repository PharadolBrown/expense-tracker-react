import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import App from './App';   //นำเข้ามาใช้งาน
import reportWebVitals from './reportWebVitals';
import RecordFinancial from "./component/financial";


// first way to create component : FunctionalComponent
function FunctionalComponent() {
  return <h1>Hi Component React</h1>
}
//Second way to create component : ClassComponent
class ClassComponent extends React.Component{
  render(){
    return <h1>Hello Class Component</h1>
  }
}
// How to import component from external


ReactDOM.render(<RecordFinancial/>,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



{/* <React.StrictMode>
</React.StrictMode> */}

// ReactDOM.render(<App />,document.getElementById('root'));
