import React, {useState, useEffect} from 'react'
import {Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckoutStep from '../components/CheckoutStep'
import {useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod, saveShippingAddress } from '../actions/cartActions'


export default function PaymentScreen() {
 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart 

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    if(!shippingAddress.address){
        navigate('/shipping')
    }

    const submitHandler = (e) =>  {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutStep step1 step2 step3/> 
            <Form onSubmit={submitHandler}>
                <Form.Group> 
                    <Form as='legend'> Select Method </Form>
                    <Col> 
                        <Form.Check
                            type='radio'
                            label ='PayPal or Credit Card'
                            id = 'paypal'
                            name = 'paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value) }
                        > 
                        </Form.Check>
                    </Col>

                </Form.Group>

                <Button type='submit' variant='primary'> 
                    Continue
                </Button>   

            </Form>
        </FormContainer>
    )
}
