import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

function Cart(props) {
  return (
    <div>
      <Table responsive>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경</th>
        </tr>
        {props.state.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.id + 1}</td>
              <td>{item.name}</td>
              <td>{item.quan}</td>
              <td>
                <button
                  onClick={() => {
                    props.dispatch({
                      type: '수량증가',
                    });
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => {
                    props.dispatch({
                      type: '수량감소',
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
        <div className='my-alert'>
          <p>지금 구매하시면 20% 할인</p>
          <button
            onClick={() => {
              props.dispatch({ type: 'false로' });
            }}
          >
            닫기
          </button>
        </div>
      ) : null}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    state: state.reducer,
    alertControl: state.reducer2,
  };
}

export default connect(mapStateToProps)(Cart);

//export default Cart;
