import React from 'react'
import { Routes, Route } from 'react-router-dom';
import DeleteTask from './pages/DeleteTask'
import CreateTask from './pages/CreateTasks'
import Home from './pages/Home';
import EditTask from './pages/EditTask';

const App = () => {
  return (
    <Routes>
      <Route>
      <Route path='/' element={<Home />} />
      <Route path='/tasks/create' element={<CreateTask/>} />
      <Route path='/tasks/edit/:id' element={<EditTask />} />
      <Route path='/tasks/delete/:id' element={<DeleteTask />} />
      </Route>
    </Routes>
  )
}

export default App