import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useLocation } from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../actions/userActions'
import { useParams } from 'react-router-dom'
import * as cons from '../constants/userConstants'

export default function UserEditScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setAdmin] = useState(false)

    const params  = useParams()
    const userId = params.id

    const location = useLocation()
    const navigate = useNavigate(); 
    const dispatch = useDispatch()

   
    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} =  userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {error: error_update, loading: loading_update, success: success_update} =  userUpdate
    
    useEffect(() => {

        if(success_update){
            dispatch({type: cons.USER_UPDATE_RESET})
            navigate('/admin/userlist')
        }else{

            if(!user.name || user._id !== Number(userId)){
                    dispatch(getUserDetails(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setAdmin(user.isAdmin)
            }
        }      
    }, [userId, user, success_update, navigate])



    const submitHandler = (e) => { 
        e.preventDefault()
        dispatch(updateUser({_id: user._id, name, email, isAdmin}))
    }

    return ( 
        <div> 
            <Link to='/admin/userlist/'> Go Back </Link> 
            <FormContainer>
                <h1> Edit User </h1>
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
        
                            <Form.Group controlId ='email'>
                                <Form.Label> Email Address </Form.Label>
                                <Form.Control   
                                                    
                                    type="email"
                                    placeholder ="Enter Email"
                                    value = {email}
                                    onChange = {(e) => setEmail(e.target.value)}
                                > 
                                </Form.Control>
                            </Form.Group>
        
                            <Form.Group controlId ='isadmin'>
                                <Form.Check                  
                                    type="checkbox"
                                    label ="Is Admin"
                                    checked = {isAdmin}
                                    onChange = {(e) => setAdmin(e.target.checked)}
                                >  
                                </Form.Check>
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
       