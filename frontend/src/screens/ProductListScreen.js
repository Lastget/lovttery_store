import React, {useState, useEffect} from 'react'
import {Link, useSearchParams, useNavigate, useLocation, } from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap';
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import FormContainer from '../components/FormContainer'
import {useDispatch, useSelector } from 'react-redux'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import * as cons from '../constants/productConstants'

export default function UserListScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch() 

    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} =  productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loading_delete, error:error_delete,success: success_delete} =  productDelete

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productCreate = useSelector(state => state.productCreate)
    const {loading: loading_create, error:error_create,success: success_create, product:createdProduct} =  productCreate

    const location = useLocation()
    let keyword = location.search

    useEffect(() => {
        dispatch({type: cons.PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin){
            navigate('/login')
        }

        if(success_create){
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts(keyword))
        }
       
    }, [dispatch, userInfo, success_delete, success_create, createProduct, keyword])

    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this product? ')){
            // delete product
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        //create product 
        dispatch(createProduct())

    }
    
  return (
    <div>
        <Row className ='align-items-center'> 
            <Col> 
                <h1> Product</h1>
            </Col>
            <Col className='text-right'> 
                <Button className='my-3' onClick={createProductHandler}> 
                    <i className='fas fa-plus'>  </i> Create Product
                </Button>
            </Col>
        </Row>

        {loading_delete && <Loader/>} 
        {error_delete && <Message variant='danger'> {error_delete} </Message>  }
        
        {loading_create && <Loader/>} 
        {error_create && <Message variant='danger'> {error_create} </Message>  }

        {loading 
            ? (<Loader/> )
            : error
                ?( <Message variant='danger'> {error} </Message>)
                :(
                    <div> 
                        <Table striped bordered hover className='table-sm'>
                            <thead> 
                                <tr> 
                                    <th> ID </th>
                                    <th> NAME </th>
                                    <th> PRICE </th>
                                    <th> CATEGORY</th>
                                    <th> BRAND</th>
                                    <th> </th>
                                </tr>
                            </thead> 
                            <tbody > 
                                
                                {products.map(product =>(
                                    <tr key = {product._id} >
                                        <td> {product._id} </td> 
                                        <td> {product.name} </td> 
                                        <td> ${product.price} </td> 
                                        <td> {product.category} </td> 
                                        <td> {product.brand} </td> 
                                    
                                        <td> 
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm'> 
                                                    <i className='fas fa-edit'></i>
                                                </Button>

                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}> 
                                                    <i className='fas fa-trash'></i>
                                            </Button>

                                        </td>
                                    </tr>

                                ))}
                                

                            </tbody>

                        </Table>
                        <Paginate pages={pages} page={page} isAdmin={true} /> 
                    </div>
                )
        }
    </div>
  )
}
