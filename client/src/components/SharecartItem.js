import React from 'react';

function SharecartItem({ cartItems, setCartItems, removeFromCart }) {
  const quantityMinusHendrler = item => {
    if (item.quantity > 1) {
      item.quantity--;
    }
    setCartItems([...cartItems]);
  };

  const quantityPlusHendrler = item => {
    if (item.quantity < 100) {
      item.quantity++;
    }
    setCartItems([...cartItems]);
  };

  return (
    <>
      {cartItems.map(el => (
        <div className="sharecart-item-container">
          <img className="sharecart-item-img" src={el.img} alt="" />
          <div className="sharecart-item-info-container">
            <div className="sharecart-item-name">{el.name}</div>
            <div className="sharecart-item-price">
              {el.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
            </div>
            <div className="sharecart-item-count-container">
              <div className="sharecart-plus-minus-container">
                <i className="fas fa-minus" onClick={() => quantityMinusHendrler(el)} />
                <div className="shartcart-cart-number">{el.quantity}</div>
                <i className="fas fa-plus" onClick={() => quantityPlusHendrler(el)} />
              </div>
            </div>
            <div className="delete-button-container">
              <button className="sharecart-delete-button" onClick={() => removeFromCart(el)}>
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default SharecartItem;
