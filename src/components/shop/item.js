import React, {useState, useEffect} from 'react';
import {addItemsToCart} from "../../store/actions/shopActions";
import {connect} from "react-redux";

const Item = ({item, addToCart}) => {
    const [numOfItems, setNumOfItems] = useState(1);
    const [range, setRange] = useState(1);

    useEffect(() => {
        if (item) {
            if (item.range) {
                setRange(item.range);
            }
        }
    }, [item]);

    const handlePlus = () => {
      if (numOfItems < 15) {
          setNumOfItems(numOfItems + range);
      }
    };

    const handleMinus = () => {
      if (numOfItems > range) {
          setNumOfItems(numOfItems - range);
      }
    };

    const handleAddToCart = () => {
        addToCart([
            {
                id: item.id,
                numOfItems
            }
        ], item.price*numOfItems);
    };

    return(
        <div className="col-sm-6 col-md-4 col-xl-3" key={item.id}>
            <div className="card shadow-sm mb-3" style={{'minWidth': '227px'}}>
                <img src={item.imgUrl} className="card-img-top mt-2" alt={item.name}/>
                <div className="card-body pt-2">
                    <p className="card-title text-center font-weight-bold my-1"><span>{item.price.toFixed(2)}</span> ש"ח</p>
                    <p className="card-text font-weight-bolder my-1">{item.name}</p>
                    {!item.brand && <p className="card-text my-1">{item.price.toFixed(2)} ₪ ל- {item.amount} {item.unit}</p>}
                    {item.brand && <p className="card-text my-1"><span>{item.amount}</span> <span>{item.unit}</span> | <span>{item.brand}</span></p>}
                    <p className="card-text my-1">
                        <small className="text-muted"><span>{item.profitability}</span></small>
                    </p>

                    <div className="btn-group mt-1 mr-2" role="group" aria-label="Basic example">
                        <button onClick={handleMinus} type="button" className="btn btn-sm btn-secondary btn-right">-</button>
                        <button className="btn btn-sm border-secondary middle">{numOfItems}</button>
                        <button onClick={handlePlus} type="button" className="btn btn-sm btn-secondary btn-left">+</button>
                    </div>
                    {item.rangeUnit && <small>{item.rangeUnit}</small>}
                    <button onClick={handleAddToCart} type="button"
                            className="btn btn-sm mt-3 btn-block btn-success float-right px-3 px-md-2"><span>הוספה לסל</span><i
                        className="fas fa-cart-plus ml-2"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (items, sum) => dispatch(addItemsToCart(items, sum))
    };
};

export default connect(null, mapDispatchToProps)(Item);