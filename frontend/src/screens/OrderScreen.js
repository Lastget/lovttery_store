import React, {useState, useEffect} from 'react'
import {Link, useSearchParams, useNavigate, useLocation, useParams } from 'react-router-dom'
import {Form, Button, Row, Col, Image, ListGroup, ListGroupItem, Card} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import {getOrderDetail, payOrder, deliverOrder} from '../actions/orderAction'
import * as cons from '../constants/orderContants'
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js'




export default function OrderScreen() {
    const {orderId} = useParams()
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {sdkReady, setSdkReady} = useState(false)

    const orderDetail = useSelector(state => state.orderDetail)
    const {order, error, loading} = orderDetail

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading: loadingDeliver, success: successDeliver} = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    if (!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc,item) => acc + item.price * item.qty, 0).toFixed(2)

    }

    // const addPayPalScript = () => {
    //     const script = document.createElement('script')
    //     script.type = 'test/javascript'
    //     script.src = "https://www.paypal.com/sdk/js?client-id=AfMS5hQmnyBW3oam7UmMp4B8Bk612ky2npFD4a8_-osb6bsPrJmomJD9hB-wc7idSd2oNrbD4A8TNE2_"
    //     script.async = true  
    //     script.onload = () => {
    //         setSdkReady(true)
    //     }
    //     document.body.appendChild(script)

    // }

    //paymentResult from paypal 

    // const successPaymentHandler = 
    //     (function(data, actions) {actions.order.capture()})
    //     .then(paymentResult => {
    //         dispatch(payOrder(orderId, paymentResult));
    //     })
        


    useEffect(() => { 
        
        if(!userInfo){
            navigate('/login')
        }
        
        if(!order || successPay || order._id !== Number(orderId)|| successDeliver ){
            dispatch({type: cons.ORDER_PAY_RESET})
            dispatch({type: cons.ORDER_DELIVER_RESET})
            dispatch(getOrderDetail(orderId))
            
        }
    },[dispatch, order, orderId, successPay, successDeliver])

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading? (
        <Loader/> 
    ): error ? (
        <Message variant='danger'> {error} </Message> 
    ) : (
        <div>
            <h1>ORDER: {order._id} </h1>   
            <Row>
                <Col md ={8}>
                    <ListGroup variant='flush'> 
                        <ListGroup.Item>   
                            <h2> Shipping </h2>
                            <p> <strong> Name: </strong> {order.user.name}</p>
                            <p> <strong> E-mail: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email} </a> </p>
                            <p> 
                                <strong> Shipping: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}
                                {' '}, {order.shippingAddress.postalCode}
                                {' '},
                                {order.shippingAddress.country}
                            </p>  
                            
                            
                            {order.isDelivered ? (
                                <Message variant ='success'> Delivered on {order.deliveredAt} </Message>
                            ): (
                                <Message variant ='warning'> Not delivered </Message>
                            )
                            } 
                            
                        </ListGroup.Item>

                        <ListGroup.Item> 
                            <h2> Payment Method </h2>
            
                            <p>
                                <strong> Method: </strong>
                                {order.paymentMethod}
                            </p> 
                            
                            {order.isPaid ? (
                                <Message variant ='success'> Paid on {order.paidAt} </Message>
                            ): (
                                <Message variant ='warning'> Not paid </Message>
                            )}
                            
                        </ListGroup.Item>

                        <ListGroup.Item> 
                            <h2> Order Items  </h2>
                            {order.orderItems.length === 0 ? <Message variant='info'> 
                                Order is empty. 
                                </Message>: (
                                    <ListGroup variant='flush'> 
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}> 
                                                <Row> 
                                                    <Col md={1}> 
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>

                                                    <Col>
                                                        <Link to = {`/product/${item.product}`}> {item.name} </Link> 
                                                    </Col>

                                                    <Col md={4}> 
                                                        {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>

                                )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card> 
                        <ListGroup>
                            <ListGroup.Item> 
                                <h2> Order Summary </h2>
                            </ListGroup.Item>

                            <ListGroup.Item> 
                                <Row> 
                                    <Col> Item: </Col>
                                    <Col> ${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item> 
                                <Row> 
                                    <Col> Shipping: </Col>
                                    <Col> ${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item> 
                                <Row> 
                                    <Col> Tax: </Col>
                                    <Col> ${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item> 
                                <Row> 
                                    <Col> Total: </Col>
                                    <Col> ${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid &&(
                                <ListGroup.Item>
                                    {loadingPay && <Loader/> }
                                
                                    <PayPalScriptProvider options={{'client-id': 'AfMS5hQmnyBW3oam7UmMp4B8Bk612ky2npFD4a8_-osb6bsPrJmomJD9hB-wc7idSd2oNrbD4A8TNE2_' }}> 
                                            <PayPalButtons
                                                createOrder={(data, actions) => {
                                                return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    value: order.totalPrice,
                                                                },
                                                            },
                                                        ],
                                                    })
                                                }}
                                                onApprove = {function (data, actions) {
                                                    return actions.order.capture().then(function (paymentResult) {
                                                        // Your code here after capture the order
                                                    
                                                        dispatch(payOrder(orderId, paymentResult))
                                                    });
                                                }}
                                    
                                        />
                                    </PayPalScriptProvider>
                                    
                                    
                                </ListGroup.Item>


                            )}

                        </ListGroup>  
                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered &&(
                            <ListGroup.Item> 
                                <Button 
                                type = 'button'
                                className='btn btn-block'
                                onClick = {deliverHandler}
                                > 
                                    Mark as Delivered
                                </Button>
                            </ListGroup.Item>
                        )}

                    </Card>
                </Col>
            </Row>
        </div>    

    )
} 
