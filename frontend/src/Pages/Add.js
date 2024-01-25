import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';


export default function Add() {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        cover: "",
    });
    const handlechange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const navigate = useNavigate();

    const handleclick = async (e) => {
        e.preventDefault();
        try {
            
            await axios.post("http://localhost:8800/books", book);
            
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='form'>
            <h1>Add new Book</h1>
            <input type='text' onChange={handlechange} placeholder='title' name="title"/>
            <input type='text' onChange={handlechange} placeholder='desc' name="desc"/>
            <input type='text' onChange={handlechange} placeholder='cover' name="cover"/>
            <button className="btn2" style={{backgroundColor:"royalblue"}} onClick={handleclick}>Add</button>
        </div>
    )
}
