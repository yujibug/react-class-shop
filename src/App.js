/*eslint-disable*/
import React, { useContext, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import shoesData from './data';
import Detail from './Detail';
import axios from 'axios';

import { Link, Route, Switch } from 'react-router-dom';
import './App.css';

let 재고context = React.createContext();

function App() {
  let [shoes, shoes변경] = useState(shoesData);
  let [loading, setLoading] = useState(false);
  let [재고, 재고변경] = useState([10, 11, 12]);

  return (
    <div className='App'>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand className='navbar-icon-brand'>
            <Link to='/' className='text-link'>
              ShoeShop
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              {/* <Nav.Link><Link to='/'>Home</Link></Nav.Link> */}
              <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.2'>
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href='#action/3.3'>
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#action/3.4'>
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route path='/detail/:id'>
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}></Detail>
        </Route>

        <Route path='/'>
          <div className='jumbotron'>
            <h1>20% Season Off</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
              consequatur voluptatibus in expedita! Mollitia tenetur incidunt
              iste.
            </p>
            <Button variant='primary'>Learn more</Button>
          </div>
          <div className='container'>
            <재고context.Provider value={재고}>
              <div className='row'>
                {shoes.map((item) => {
                  return <Card item={item} key={item.id}></Card>;
                })}
              </div>
            </재고context.Provider>
            <button
              className='btn btn-primary'
              onClick={() => {
                setLoading(true);
                axios
                  .get('https://codingapple1.github.io/shop/data2.json')
                  .then((result) => {
                    setLoading(false);
                    shoes변경([...shoes, ...result.data]);
                  })
                  .catch(console.log);
              }}
            >
              더보기
            </button>
            {loading === true ? <p>로딩중입니다</p> : null}
          </div>
        </Route>
      </Switch>
    </div>
  );
}

function Card(props) {
  let 재고 = useContext(재고context);

  return (
    <div className='col-md-4'>
      <Link to={'/detail/' + props.item.id}>
        <img
          src={
            'https://codingapple1.github.io/shop/shoes' +
            (props.item.id + 1) +
            '.jpg'
          }
          width='100%'
        ></img>
      </Link>
      <h4>{props.item.title}</h4>
      <p>
        {props.item.content} {props.item.price}
      </p>
      <p>재고 : {재고[props.item.id]}</p>
    </div>
  );
}

export default App;
