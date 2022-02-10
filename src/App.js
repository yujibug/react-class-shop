/*eslint-disable*/
import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import shoesData from './data';
import Detail from './Detail';
import axios from 'axios';

import { Link, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  let [shoes, shoes변경] = useState(shoesData);
  let [loading, setLoading] = useState(false);

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
          <Detail shoes={shoes}></Detail>
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
            <div className='row'>
              {shoes.map((item) => {
                return <Card item={item} key={item.id}></Card>;
              })}
            </div>
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
    </div>
  );
}

export default App;
