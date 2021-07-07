import React from "react"; //must have this line for use React.Fragment
import Transaction from "./transaction";
import "./financial.css";
import FormComponent from "./formComponent";
import { useState, useEffect, useReducer } from "react";
import DataContext from "../data/dataContext";
import ReportComponent from "./reportComponent";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// create multiple component
const design = {
  color: "rgb(6, 210, 146)",
  textAlign: "center",
  fontSize: "30px",
  margin: "0 0 10px 0",
};
const Title = () => <h1 style={design}>App income - expenses</h1>;

//Mix & Set Layout > short components
function RecordFinancial() {
  const initData = [
    { id: 1, title: "salary", amount: 20000 },
    { id: 3, title: "medical treatment fee", amount: -2000 },
    { id: 4, title: "food cat", amount: -3000 },
  ];

  const [items, setItems] = useState(initData); //set state

  const [reportIncome, setReportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);

  const onAddNewItem = (newItem) => {
    console.log("ข้อมูลที่ส่งที่จาก Form Component = ", newItem);

    setItems((prevItem) => {
      return [newItem, ...prevItem]; //add to front of the array
    });
  };
  useEffect(() => {
    const amounts = items.map((items) => items.amount); //ดึงแต่ละเลขจาก state items มาสร้าง array amount ใหม่
    console.log({ amounts });
    const income = amounts
      .filter((element) => element > 0)
      .reduce((total, element) => (total += element), 0); //filter positive number// reduce for one result : decare two var is total (default value = 0 += each element arr income )
    console.log({ income });
    const expense =
      amounts
        .filter((element) => element < 0)
        .reduce((total, element) => (total += element), 0) * -1; //multiply -1 because don't wont forward symbol
    console.log({ expense });

    console.log("Total income : ", income);
    console.log("Total income : ", expense);

    setReportIncome(income.toFixed(2)); //keep value in state reportIcome
    setReportExpense(expense.toFixed(2));
  }, [items, reportIncome, reportExpense]);

  //reducer state
  const [showReport, setShowReport] = useState(true);
  const reducer = (state, action) => {
    //function ที่มี 2 params
    switch (
      action.type //verify type action
    ) {
      case "SHOW":
        return setShowReport(true);
      case "HIDE":
        return setShowReport(false);
    }
  };
  const [result, dispatch] = useReducer(reducer, setShowReport); //result : เก็บค่าผลลัพธ์ //dispatch : each action in reducer (ADD,SUB,CLEAR) // reducer : function // count : state that transform data

  // My : show-hide
  const conShowHide = document.querySelector(".show-hide");
  const show = document.querySelector(".show");
  const hide = document.querySelector(".hide");
  const ball = document.querySelector(".ball");
  const h = () => dispatch({ type: "HIDE" });
  const s = () => dispatch({ type: "SHOW" });

  const showhide = () => {
    switch (showReport) {
      case true:
        show.innerHTML = "hide";
        // show.classList.remove('toShow');
        show.classList.add("toHide");
        ball.classList.add("ball2");
        ball.style.backgroundColor = "rgb(27, 212, 151)";
        conShowHide.classList.add("changeColor");
        console.log(showReport);
        return h(), setShowReport(false);
        break;
      case false:
        show.innerHTML = "show";
        show.classList.remove("toHide");
        // show.classList.add('toShow');
        ball.classList.remove("ball2");
        ball.style.backgroundColor = "#fff";
        conShowHide.classList.remove("changeColor");
        console.log(showReport);
        return s(), setShowReport(true);
        break;
    }
  };

  return (
    <DataContext.Provider
      value={{ income: reportIncome, expense: reportExpense }}
    >
      <div className="container">
        <Title />
        <Router>
          <div>
            <ul className="horizontal-menu">
              <li>
                <Link to="/">Statement</Link>
              </li>
              <li></li>
              <li>
                <Link to="/ledger">Ledger</Link>
              </li>
            </ul>
            <Switch>
              <Route path="/" exact>
                {showReport && <ReportComponent />}
                {/* <div>
                  <button onClick={()=>dispatch({type:"SHOW"})}>show</button>
                   <button  onClick={()=>dispatch({type:"HIDE"})}>hide</button>
                  </div> */}
                {/* <div className="con-show-hide">
                  <div className="show-hide" onClick={showhide}>
                    <div className="show">show</div>
                    <div className="ball"></div>
                  </div>
                </div> */}
              </Route>
              <Route path="/ledger">
                <section>
                  <FormComponent onAddItem={onAddNewItem} />
                  <Transaction items={items} />
                </section>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </DataContext.Provider>
  );
}
export default RecordFinancial;

// 2x > props: onAdditem call function onAddNewItem
// 2x > items ={initData} :send imitData pass props to Transaction.js
// prop items use info from variable items

//{showReport && <ReportComponent/>} //call ReportComponent when showReport == true
