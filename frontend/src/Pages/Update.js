import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
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
    const location =useLocation();
    //Mf really consoled the location and then split off the number he needed
    const bookId = location.pathname.split("/")[2];
    const handleclick = async (e) => {
        e.preventDefault();
        try {
            await axios.put("https://artgallerynode.onrender.com/books/"+bookId, book);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='form'>
            <h1>Update the Book</h1>
            <input type='text' onChange={handlechange} placeholder='title' name="title"/>
            <input type='text' onChange={handlechange} placeholder='desc' name="desc"/>
            <input type='text' onChange={handlechange} placeholder='cover' name="cover"/>
            <button className="btn2" onClick={handleclick}>Add</button>
        </div>
    )
}
