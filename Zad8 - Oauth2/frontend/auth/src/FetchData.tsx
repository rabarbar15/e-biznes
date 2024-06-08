import axios from "axios";
import { useEffect, useState } from "react";



export const useFetchAuth = () => {
    const [authorized, setAuthorized] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        
        axios.get('http://localhost:3001/authConfirm', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        
            .then(response => {
                // console.log(response.data);
                
                setAuthorized(response.data);
            })
            .catch(error => {
                setError(error.response.data)
                console.error('Error fetching data', error)
            })
    }, [])

    return { authorized, error };
}



export const signup = (email: String, password: String, callback: (response: any) => void) => {

    const user = JSON.stringify({
        email: email,
        password: password
    })

    axios.post('http://localhost:3001/signup', user, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
        .then(response => {
            // console.log(response.data);
            callback(response.data)
            console.log("User created succesfully", response.data);

        })
        .catch(err => {
            console.log("Error while signing up", err);
            // console.log(err.response.data.errors);
            callback(err.response.data.errors)
            throw err.response.data
        })
}

export const signin = (email: string, password: string, callback: (response: any) => void) => {
    const user = JSON.stringify({
        email: email,
        password: password
    })

    axios.post('http://localhost:3001/signin', user, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
        .then(response => {
            // console.log(response.data);
            callback(response.data)
            console.log('User logged in succesfully');
        })
        .catch(err => {
            console.log("Error while create an order", err);
            // console.log(err.response.data.errors);
            callback(err.response.data.errors)
            throw err.response.data
        })
}

export const logout = () => {
    axios.get('http://localhost:3001/logout', {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
}

interface User {
    id: number;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  }

export const getUser = () => {
    const [user, setUser] = useState<User | null>(null)
    
    useEffect(() => {
        axios.get('http://localhost:3001/user', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then(response => {
            // console.log(response.data);
            
            setUser(response.data);
        })
        .catch(error => {
            console.error('Error fetching user', error)
        })
    }, [])
    
    return {...user}
}