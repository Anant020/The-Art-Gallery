import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

export default function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchallbooks = async () => {
      try {
        // const res = await axios.get("http://localhost:8800/books");
        const res = await axios.get("https://artgallerynode.onrender.com/books");
        // axios se fetching
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchallbooks()
  }, []);

  const handler = () => {
    navigate("/add");
  }
  const handledelete = async (id)=>{
    console.log(id);
    try{
      // await axios.delete("http://localhost:8800/books/"+id);
      await axios.delete("https://artgallerynode.onrender.com/books/"+id);
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div>
      <h1 className='name'>The Art Gallery</h1>
      <div className='books'>
        {books.map((book) => (
          <div className='book' key={book.id} >
            { book.cover && <img className='image1' src={book.cover} alt=''></img> }
            
            <h2>{book.title}</h2>

            <p>{book.desc}</p>
            <div className='buttons1'>
            <button className='update'><Link className='del' to={`/update/${book.id}`}>Update</Link></button>
            <button className='delete' onClick={()=>handledelete(book.id)} >Delete</button>
            </div>
          </div>
        ))}
      </div>
      <button className='btn1' onClick={handler}>Add </button>
    </div>
  )
}


