/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

let Box = styled.div`
  padding: 20px;
`; //css를 입혀놓은 컴포넌트 만들기

let Title = styled.h4`
  font-size: 25px;
`;

function Detail(props) {
  let [alert, setAlert] = useState(true);
  let [animation, setAnimation] = useState('');

  useEffect(() => {
    let timerAniamtion = setTimeout(() => {
      setAnimation('fade-out-animation');
    }, 2000);
    let timerAlert = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => {
      clearTimeout(timerAniamtion);
      clearTimeout(timerAlert);
    };
  }, [alert]);

  let history = useHistory();
  let { id } = useParams();
  let selectProd = props.shoes.find((item) => {
    return item.id == id;
  });

  function 주문() {
    const copied = [...props.재고];
    copied[id] -= 1;
    props.재고변경(copied);
  }

  return (
    <div className='container'>
      <Box>
        <Title className='red'>Detail</Title>
      </Box>
      <div className='alert-wrapper'>
        {alert === true ? (
          <div className={`my-alert-red ${animation}`}>
            <p>재고가 얼마 남지 않았습니다</p>
          </div>
        ) : null}
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <img
            src={
              'https://codingapple1.github.io/shop/shoes' +
              (selectProd.id + 1) +
              '.jpg'
            }
            width='100%'
          />
        </div>
        <div className='col-md-6 mt-4'>
          <h4 className='pt-5'></h4>
          <p>{selectProd.title}</p>
          <p>{selectProd.price}원</p>

          <Info 재고={props.재고} id={id}></Info>

          <button className='btn btn-danger' onClick={주문}>
            주문하기
          </button>
          <button
            className='btn btn-danger btn-back'
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}

function Info(props) {
  return <p>재고 : {props.재고[props.id]}</p>;
}

export default Detail;
