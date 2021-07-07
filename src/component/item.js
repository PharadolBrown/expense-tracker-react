import './item.css'
import PropTypes from 'prop-types';

const Item=(props)=>{
    const {title,amount}=props;
    const status = amount<0 ? "expense":"income"
    const symbol = amount<0 ? "-":"+"
    const formatNumber = (num) => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };


    return (
      <li className={status}>
        {" "}
        {title}
        <span className="money">
          {symbol}
          {formatNumber(Math.abs(amount))}
        </span>
      </li>
    );
}
Item.prototype={
    title:PropTypes.string.isRequired,
    amount:PropTypes.number.isRequired
}

export default Item;

// Match.abs : transform to positive because the number has two negative symbol to their front