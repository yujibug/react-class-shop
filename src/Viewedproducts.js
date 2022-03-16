import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import './Viewedprodcuts.css';

// let Container = styled.div`
//   background-color: red;
//   width: 220px;
//   height: 450px;
//   display: flex;
//   flex-direction: column;
//   position: fiexed;
//   bottom: 0;
//   box-sizing: border-box;
// `;

// let Item = styled.div`
//   width: 220px;
//   height: 150px;
//   margin: 0;
//   background-image: url('https://codingapple1.github.io/shop/shoes1.jpg');
//   background-size: cover;
//   background-repeat: no-repeat;
// `;

function Viewedproducts(props) {
  let product = props.viewedproduct;
  if (product === null) {
    product = [];
  }
  console.log(product);
  return (
    <div className='viewed-product-container'>
      {product.map((item) => {
        return (
          <Link to={'/detail/' + Number(item)}>
            <img
              src={
                'https://codingapple1.github.io/shop/shoes' +
                (Number(item) + 1) +
                '.jpg'
              }
              width='100%'
            ></img>
          </Link>
        );
      })}
    </div>
  );
}

export default Viewedproducts;
