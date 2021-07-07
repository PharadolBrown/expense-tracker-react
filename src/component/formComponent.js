import "./formComponent.css"
import {useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid'

const FormComponent=(props)=>{    //ใส่ (props) เพราะ มีการเพิ่ม prop ใน financial.js
    const [title,setTitle]=useState('')
    const [amount,setAmount]=useState(0)
    const [formValid,setFormValid]=useState(false)

    const inputTitle=(event)=>{
        setTitle(event.target.value)
    }
    const inputAmount=(event)=>{
        setAmount(event.target.value)
    }
    const saveItem =(event)=>{
        event.preventDefault()  //กันไม่ให้จอรีเฟรช
        const itemData ={
            id:uuidv4(),
            title:title,    //ดึงมาจาก state title,amount
            amount:Number(amount)
        }
        console.log("create itemData",itemData);
        props.onAddItem(itemData) //call props onAddItem then send itemData to onAddItem props for work in onAddNewItem function
        setTitle('') 
        setAmount(0)
    }

    useEffect(()=>{
        const checkData =title.trim().length>0 && amount!==0  // trim ลบช่องว่างซ้ายขวา //checkData เก็บค่า boolean
        setFormValid(checkData)
    },[title,amount],)
    //useEffect : ดักจับการรีเฟรช component จาก การเปลี่ยนแปลงของ title , amount
    return(
        <div>
            <form onSubmit={saveItem}>
                <div className="form-control">
                    <label>Order</label>
                    <input type="text" placeholder="enter your order" onChange={inputTitle} value={title} />
                </div>
                <div className="form-control">
                    <label>Amount</label>
                    <input type="number" placeholder="enter amount" onChange={inputAmount} value={amount} />
                </div>
                <div>
                    <button type="submit" className="submit" disabled={!formValid}>submit</button>
                </div>
            </form>
        </div>
    )
}
export default FormComponent