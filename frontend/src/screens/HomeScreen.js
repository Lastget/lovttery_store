import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import {listProducts} from '../actions/productActions'
import {useSearchParams, useLocation} from 'react-router-dom'
import  ProductCarousel from '../components/ProductCarousel'


// API call and actions 
function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages } = productList
    
    const location = useLocation()
    let keyword = location.search

    // if (keyword){
    //     keyword = keyword.split('?keyword=')[1].split('&page')[0]
    // } 
    // console.log(keyword)

    useEffect(() => {
        dispatch(listProducts(keyword))
      
    }, [dispatch, keyword])


  
    return (
        <div>
            {!keyword && <ProductCarousel /> }
        
            <h1>LATEST PRODUCTS</h1>
            {loading ? <Loader /> 
                : error ? <Message variant='danger'> {error} </Message> 
                    : 
                    <div> 
                        <Row>
                            {products.map(product =>(
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword} /> 
                    </div> 
            }
        </div>
  )
}

export default HomeScreen