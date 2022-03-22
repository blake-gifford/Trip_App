import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { navigate, Link } from '@reach/router'
import Context from '../components/Context';

const initialUser = {
    userName:'',
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
    trips:[],
}

const initialMessages = []

const initialMessage = {
    message: '',
    userName: '',
    comments: [],
    // createdAt:'',
}

const initialComment = {
    comment: '',
    userName: '',
    // createdAt: '',
}

const Blog = props => {

    const context = useContext(Context);
    const { _id } = context.loggedInUser;
    const [ user, setUser ] = useState(initialUser);
    const [ messages, setMessages] = useState(initialMessages);
    const [ message, setMessage] = useState(initialMessage);
    const [ comment, setComment] = useState(initialComment);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${_id}`)
            .then(response=> setUser(response.data.results))
            .catch(err => console.log(err))
        // axios.get(`http://localhost:8000/api/messages/`)
        //     .then(response => setMessages(response.data.results))
        //     .catch(err => console.log(err))
    },[message,comment])
    useEffect(() => {
        axios.get(`http://localhost:8000/api/messages`)
            .then(response => setMessages(response.data.results))
            .catch(err => console.log(err))
    }, [])

    const messageChangeHandler = e => {
        setMessage({userName:user.userName})
        const { name, value } = e.target;
        setMessage({...message, [name]:value})
    }
    
    const messageSubmitHandler = e => {
        axios.post(`http://localhost:8000/api/message/create`)
        .then(response => setMessages(response.data.results))
        .catch()
    }

    const commentChangeHandler = e => {
        setComment({userName:user.userName})
        const { name, value } = e.target;
        setComment({...comment, [name]:value})
    }

    const commentSubmitHandler = e => {
        axios.put(`http://localhost:8000/api/`)
            .then()
            .catch()
    }


    return (
        <div>
            {
                messages.map((message, i) =>
                <ul key={i} className="noBullets">
                    <li>
                        {message.message}
                    </li>
                    <li>
                        Posted by: {message.userName}
                    </li>
                    <li>
                        Created at: {message.createdAt}
                    </li>
                    <li>
                    <form onSubmit={ commentSubmitHandler }>
                    <h1>Post a Comment!</h1>
                    <label htmlFor="comment">Comment:</label>
                    <input type="text" name="comment" id="" onChange={commentChangeHandler} />
                    <button className="roundButton" type="submit">Post your comment</button>
                    </form>
                    </li>
                    <li>
                        {/* {messages.comments.map((comment, i)=>
                            <ul key={i}>
                                <li>{comment.comment}</li>
                                <li>Posted by {comment.username}</li>
                                <li>Created at: {comment.createdAt}</li>
                            </ul>
                        )
                        } */}
                    </li>
                </ul>
                )
            }

            <form onSubmit={ messageSubmitHandler }>
            <h1>Post a Message!</h1>
            <label htmlFor="message"></label>
            <input type="text" name="message" id="" onChange={messageChangeHandler} />
            <input className="roundButton" type="submit" value="Post your Message"/>
            </form>

            
        </div>
    )
}

export default Blog
