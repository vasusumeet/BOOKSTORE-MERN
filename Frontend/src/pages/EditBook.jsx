import React,{useState,useEffect} from 'react';
import BackButtton from '../components/BackButtton';
import Spinner from '../components/spinner';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title,setTitle]=useState('');
  const [author,setAuthor]=useState('');
  const [publishYear,setpublishYear]=useState('');
  const [loading, setLoading]=useState(false);
  const navigate=useNavigate();
  const {enqueueSnackbar}=useSnackbar();
  const {id}=useParams();
  useEffect(()=>{
    setLoading(true);
    axios.get(`https://bookstore-mern-seven.vercel.app/books/${id}`)
    .then((response)=>{
      setAuthor(response.data.author);
      setpublishYear(response.data.publishYear)
      setTitle(response.data.title)
      setLoading(false);
    })
    .catch((error)=>{
      setLoading(false);
      alert('An Error happened. Please Check Console');
      console.log(error);
    })

  },[])

  const handleEditBook=()=>{
    const data=
    {
      title,
      author,
      publishYear
    };
    setLoading(true);
    axios.put(`https://bookstore-mern-seven.vercel.app/books/${id}`,data)
    .then(()=>{
      setLoading(false);
      enqueueSnackbar('Book Edited Successfully',{variant:'success'});
      navigate('/');
    })
    .catch((error)=>{
      setLoading(false);
      //alert('An error happened. Please Check Console')
      enqueueSnackbar('Error',{variant:'error'});
      console,log(error);
    }
  
  )


  }
  return (
    <div className='p-4'>
      <BackButtton/>
      <h1 className='3xl'>Edit Book</h1>
      {
        loading?<Spinner/>:''
      }
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input 
          type='text'
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className='border-2  border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input 
          type='text'
          value={author}
          onChange={(e)=>setAuthor(e.target.value)}
          className='border-2  border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input 
          type='text'
          value={publishYear}
          onChange={(e)=>setpublishYear(e.target.value)}
          className='border-2  border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>

      </div>

    </div>
  )
}

export default EditBook
