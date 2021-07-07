import Item from './item'
import './transaction.css'


// (props) : get props ที่ถูกส่งผ่านมา 
const Transaction =(props)=>{
    const {items} = props //เก็บค่า props ลงใน array items (items ต้องตรงกับ props)
    return (
    <div>
        <ul className='item-list'>
        {items.map((element)=>{
            // return <Item title={element.title} amount={element.amount}/>
            return <Item {...element} key={element.id} />  //ย่อจาก top ได้เพราะ data มี title , amount ชื่อเดียวกัน
        })}  
      </ul>
    </div>
    )// ชื่อ component เหมือนกันจึงต้อมี key เพื่อแยกความแตกต่าง
}

export default Transaction