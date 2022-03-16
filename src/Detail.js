/*eslint-disable*/
import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import { Nav, InputGroup, FormControl, Button } from 'react-bootstrap';

import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

let Box = styled.div`
  padding: 20px;
`; //css를 입혀놓은 컴포넌트 만들기

let Title = styled.h4`
  font-size: 25px;
`;

function Detail(props) {
  let [clickedTab, setClickedTab] = useState(0);

  let [alert, setAlert] = useState(true);
  let [animation, setAnimation] = useState('');
  let [opacitySwitch, setOpacitySwitch] = useState(false);

  const inputQuan = useRef();

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

  useEffect(() => {
    let product = localStorage.getItem('viewedProducts');
    if (product === null) {
      // let list = [id];
      // localStorage.setItem('viewedProducts', JSON.stringify(list));
      product = [];
    } else {
      product = [...JSON.parse(product)];
    }
    product.unshift(id);
    product = [...new Set(product)];
    localStorage.setItem('viewedProducts', JSON.stringify(product));
    props.setViewedProduct([
      ...JSON.parse(localStorage.getItem('viewedProducts')),
    ]);
    /*로컬스토리지에 id값 리스트를 저장하는게 목표잖아
    근데 중복을 허용하면 안되고 -> set 자료형으로 하면되는데
    젤 처음에 로컬스토리지에서 값을 불러온다음에
    그게 null값이면 그냥 무지성으로 때려박기(set자료형도 필요 x)
    만약 null값이 아니면 set자료형 씌운 로컬스로지에서 나온값 + id 를
    스프레드 신택스씌운다음에 로컬스토리지에 저장*/
  }, []);

  function 주문() {
    if (inputQuan.current.value == '') {
      return;
    }
    if (Number(inputQuan.current.value) > props.재고[id]) {
      window.alert('재고가 부족합니다');
      return;
    }
    const copied = [...props.재고];
    copied[id] -= 1;
    props.재고변경(copied);
    props.dispatch({
      type: '항목추가',
      payload: {
        id: selectProd.id,
        name: selectProd.title,
        quan: inputQuan.current.value,
      },
    });
    history.push('/cart');
  }

  return (
    <div className='container'>
      <Box>
        <Title className='red'>Detail</Title>
      </Box>
      <div className='alert-wrapper'>
        {alert === true && (
          <div className={`my-alert-red ${animation}`}>
            <p>재고가 얼마 남지 않았습니다</p>
          </div>
        )}
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

          <InputGroup className='mb-3'>
            <FormControl placeholder='수량' ref={inputQuan} />
            <Button
              variant='outline-secondary'
              id='button-addon2'
              onClick={주문}
            >
              주문하기
            </Button>
          </InputGroup>
          <button
            className='btn btn-danger btn-back'
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>

        <Nav className='mt-5' variant='tabs' defaultActiveKey='0'>
          <Nav.Item>
            <Nav.Link
              eventKey='0'
              onClick={() => {
                setOpacitySwitch(false);
                setClickedTab(0);
              }}
            >
              탭0
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey='1'
              onClick={() => {
                setOpacitySwitch(false);
                setClickedTab(1);
              }}
            >
              탭1
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey='2'
              onClick={() => {
                setOpacitySwitch(false);
                setClickedTab(2);
              }}
            >
              탭2
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <CSSTransition in={opacitySwitch} classNames='opacity' timeout={500}>
          <TabContent
            clickedTab={clickedTab}
            setOpacitySwitch={setOpacitySwitch}
          ></TabContent>
        </CSSTransition>
      </div>
    </div>
  );
}

function TabContent(props) {
  useEffect(() => {
    props.setOpacitySwitch(true);
  });

  if (props.clickedTab === 0) {
    return <div>0번째 내용입니다</div>;
  }
  if (props.clickedTab === 1) {
    return <div>1번째 내용입니다</div>;
  }
  if (props.clickedTab === 2) {
    return <div>2번째 내용입니다</div>;
  }
}

function Info(props) {
  return <p>재고 : {props.재고[props.id]}</p>;
}

function mapStateToProps(state) {
  return {
    state: state.reducer,
  };
}

export default connect(mapStateToProps)(Detail);
