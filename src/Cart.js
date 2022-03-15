import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function Cart(props) {
  let item = useSelector((state) => state.reducer);
  let alertControl = useSelector((state) => state.reducer2);
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
        {item.map((item) => {
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
      {alertControl && (
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
      )}
    </div>
  );
}
export default Cart;
