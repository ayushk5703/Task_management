import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duedate, setDuedate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!id) {
      enqueueSnackbar('No task ID provided in the URL', { variant: 'error' });
      return;
    }

    setLoading(true);
    axios.get(`http://localhost:5555/tasks/${id}`)
      .then((response) => {
        setTitle(response.data.title || '');
        setDescription(response.data.description || '');
        setDuedate(response.data.duedate ? response.data.duedate.split('T')[0] : '');
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching task:', error);
        enqueueSnackbar('Error fetching task data', { variant: 'error' });
      });
  }, [id, enqueueSnackbar]);

  const handleEditTask = async () => {
    if (!id) {
      enqueueSnackbar('No task ID provided', { variant: 'error' });
      return;
    }

    const data = {
      title,
      description,
      duedate,
    };

    try {
      setLoading(true);
      await axios.put(`http://localhost:5555/tasks/${id}`, data);
      setLoading(false);
      enqueueSnackbar('Task updated successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Error updating task', { variant: 'error' });
      console.error('Error updating task:', error);
      console.error('Error response data:', error.response?.data);
      console.error('Error response status:', error.response?.status);
      console.error('Error response headers:', error.response?.headers);
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Task</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Description</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Duedate</label>
          <input
            type='date'
            value={duedate}
            onChange={(e) => setDuedate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditTask}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTask;
