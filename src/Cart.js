import React from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import { connect } from 'react-redux';

function Cart(props) {
  let state = useSelector((state) => state.reducer);
  let dispatch = useDispatch();

  return (
    <div>
      <Table responsive>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경</th>
        </tr>
        {state.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quan}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch({
                      type: '수량증가',
                      payload: {
                        id: item.id,
                      },
                    });
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => {
                    dispatch({
                      type: '수량감소',
                      payload: { id: item.id },
                    });
                  }}
                >
                  -
                </button>
              </td>
            </tr>
          );
        })}
      </Table>
      {props.alertControl === true ? (
        <div className='my-alert-red'>
          <p>지금 구매하시면 20% 할인</p>
          <button
            onClick={() => {
              dispatch({ type: 'false로' });
            }}
          >
            닫기
          </button>
        </div>
      ) : null}
    </div>
  );
}
export default Cart;
