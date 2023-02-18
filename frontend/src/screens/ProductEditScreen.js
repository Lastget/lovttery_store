import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useLocation } from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {useDispatch, useSelector } from 'react-redux'
import { listProductsDetails, updateProduct } from '../actions/productActions'
import { useParams } from 'react-router-dom'
import * as cons from '../constants/productConstants'
import axios from 'axios'

export default function ProductEditScreen() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const params  = useParams()
    const productId = params.id

    const location = useLocation()
    const navigate = useNavigate(); 
    const dispatch = useDispatch()

   
    const productDetails = useSelector(state => state.productDetail)
    const {error, loading, product} =  productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {error:errorUpdate, loading:loadingUpdate, success: successUpdate} =  productUpdate


    useEffect(() => {

        if(successUpdate){
            dispatch({type: cons.PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')

        }else{

            if(!product.name || product._id !== Number(productId)){
                dispatch(listProductsDetails(productId))
            }else{
            setName(product.name)
            setPrice(product.price)
            setBrand(product.brand)
            setImage(product.image)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
            }
        }

    }, [productId, product, dispatch, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        //formdata accpet key value pairs. 
        const formData = new FormData()
        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)
        try{
            //config to let what type of data we are sending
            const config = {
                headers:{ 
                "Content-Type": "multipart/form-data"}
            }

            const {data} = await axios.post(`/api/products/upload/`, formData, config)
             
            setImage(data)
            setUploading(false)


        }catch(error){
            setUploading(false)

        }
    }

    const submitHandler = (e) => { 
        e.preventDefault()
        //update product
        dispatch(updateProduct({
            _id:productId, 
            name,
            price,
            image, 
            brand,
            category,
            countInStock,
            description
        }))
        
    }

    return ( 
        <div> 
            <Link to='/admin/productlist/'> Go Back </Link> 
            <FormContainer>
                <h1> Edit Product </h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'> {errorUpdate} </Message> }

                {loading? <Loader /> : error ? <Message variant='danger'> {error} </Message> 
                    :(
                        <Form onSubmit={submitHandler}> 

                            <Form.Group controlId ='name'>
                                <Form.Label> Name </Form.Label>
                                <Form.Control     
                                                
                                    type="name"
                                    placeholder ="Enter Name"
                                    value = {name}
                                    onChange = {(e) => setName(e.target.value)}
                                > 
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId ='price'>
                                <Form.Label> Price </Form.Label>
                                <Form.Control     
                                                
                                    type="number"
                                    placeholder ="Enter price"
                                    value = {price}
                                    onChange = {(e) => setPrice(e.target.value)}
                                > 
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId ='image'>
                                <Form.Label> Image </Form.Label>
                                <Form.Control     
                                                
                                    type="text"
                                    placeholder ="Enter Image"
                                    value = {image}
                                    onChange = {(e) => setImage(e.target.value)}
                                > 
                                </Form.Control>

                                <Form.Control
                                    type='file'
                                    onChange={uploadFileHandler}
                                > 

                                </Form.Control>
                                {uploading && <Loader />}
                            </Form.Group>

                            <Form.Group controlId ='brand'>
                                <Form.Label> Brand </Form.Label>
                                <Form.Control     
                                                
                                    type="text"
                                    placeholder ="Enter Brand"
                                    value = {brand}
                                    onChange = {(e) => setBrand(e.target.value)}
                                > 
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId ='countInStock'>
                                <Form.Label> CountInStock </Form.Label>
                                <Form.Control     
                                                
                                    type="number"
                                    placeholder ="Enter CountInStock"
                                    value = {countInStock}
                                    onChange = {(e) => setCountInStock(e.target.value)}
                                > 
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId ='category'>
                                <Form.Label> Category </Form.Label>
                                <Form.Control     
                                                
                                    type="text"
                                    placeholder ="Enter Category"
                                    value = {category}
                                    onChange = {(e) => setCategory(e.target.value)}
                                > 
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId ='description'>
                                <Form.Label> Description </Form.Label>
                                <Form.Control     
                                                
                                    type="text"
                                    placeholder ="Enter Description"
                                    value = {description}
                                    onChange = {(e) => setDescription(e.target.value)}
                                > 
                                </Form.Control>
                            </Form.Group>
        
                         
        
        
                            <Button type='submit' variant='primary'>
                                Update
                            </Button>
        
                        </Form> 
    
                        
                    ) }
            </FormContainer>
        </div>
    )
}
       