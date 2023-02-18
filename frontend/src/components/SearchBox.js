import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'


export default function SearchBox() {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
    const { pathname } = useLocation();


    const submitHandler = (e) => {
        e.preventDefault( )
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`)
        } else{
            navigate(pathname)
        }

    }
    return (
        
        <Form  onSubmit={submitHandler} className='d-flex' >
            <Form.Control
                type = 'text'
                name ='q' 
                onChange={(e) => setKeyword(e.target.value)}
                className = 'mr-sm-2 ml-sm-5'
            /> 

            <Button
                type= 'submit'
                className = 'p-2'
            >
                Search
            </Button>
        </Form>
        
    )
}
