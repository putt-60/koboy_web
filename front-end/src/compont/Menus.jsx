import React from 'react'
import { Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { numberWithCommas } from '../utils/utils.js';

function Menus({menu}) {
  return (
    <Col md={4} xs={6} className='mb-4'>
    <Card className='shadow'>
      <Card.Img variant="top" src={"assets/images/"+menu.category.nama.toLowerCase()+"/"+menu.gambar} />
      <Card.Body>
        <Card.Title>{menu.nama} <strong>({menu.kode})</strong></Card.Title>
        <Card.Text>
          Rp.{numberWithCommas(menu.harga)}
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
  )
}

export default Menus