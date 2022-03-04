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

  function 주문() {
    if (inputQuan.current.value == '') {
      return;
    }
    const copied = [...props.재고];
    copied[id] -= 1;
    props.재고변경(copied);
    props.dispatch({
      type: '항목추가',
      payload: {
        id: `${selectProd.id}`,
        name: `${selectProd.title}`,
        quan: `${inputQuan.current.value}`,
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
