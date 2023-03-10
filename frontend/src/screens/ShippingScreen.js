import React, {useState, useEffect} from 'react'
import {Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckoutStep from '../components/CheckoutStep'
import {useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'

export default function ShippingScreen() {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.city)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')

    }

    return (
      <FormContainer>
          <CheckoutStep step1 step2/>
          <h1> Shipping </h1> 
        <Form onSubmit={submitHandler} > 
            <Form.Group controlId ='address'>
                <Form.Label>  Address </Form.Label>
                <Form.Control   
                    required                   
                    type="text"
                    placeholder ="Enter Address"
                    value = {address ? address : ''}
                    onChange = {(e) => setAddress(e.target.value)}
                > 
                </Form.Control>
            </Form.Group>

            <Form.Group controlId ='city'>
                <Form.Label>  City </Form.Label>
                <Form.Control   
                    required                   
                    type="text"
                    placeholder ="Enter city"
                    value = {city ? city : ''}
                    onChange = {(e) => setCity(e.target.value)}
                > 
                </Form.Control>
            </Form.Group>

            <Form.Group controlId ='postalCode'>
                <Form.Label>  Postal Code </Form.Label>
                <Form.Control   
                    required                   
                    type="text"
                    placeholder ="Enter postalcode"
                    value = {postalCode ? postalCode : ''}
                    onChange = {(e) => setPostalCode(e.target.value)}
                > 
                </Form.Control>
            </Form.Group>

            <Form.Group controlId ='country'>
                <Form.Label>  Country </Form.Label>
                <Form.Control   
                    required                   
                    type="text"
                    placeholder ="Enter country"
                    value = {country ? country : ''}
                    onChange = {(e) => setCountry(e.target.value)}
                > 
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Continue
            </Button>
            
        </Form>
      </FormContainer>
    )
}
