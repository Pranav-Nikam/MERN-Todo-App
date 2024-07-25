import React, { useEffect, useState } from 'react';
import Create from './Create';
import './App.css';
import axios from 'axios';
import {BsFillTrashFill, BsPencil } from 'react-icons/bs';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [updatetask, setUpdatetask] = useState('');
    const [taskid, setTaskid] = useState('');

    const fetchTodos = async () => {
        try {
            const result = await axios.get('http://localhost:5000/get');
            setTodos(result.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const edit = async (id) => {
        try {
            const result = await axios.put(`http://localhost:5000/edit/${id}`);
            console.log(result.data);
            fetchTodos();
        } catch (err) {
            console.error(err);
        }
    };

    const Update = async (id, updatedTask) => {
        try {
            const result = await axios.put(`http://localhost:5000/update/${id}`, { task: updatedTask });
            console.log(result.data);
            fetchTodos();
            setTaskid('');
            setUpdatetask('');
        } catch (err) {
            console.error(err);
        }
    };

    const Hdelete = async (id) => {
        try {
            const result = await axios.delete(`http://localhost:5000/delete/${id}`);
            console.log(result.data);
            fetchTodos();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main>
            <Create />
            {
                todos.length === 0 ? <div className='task'>No Tasks</div> :
                    todos.map((todo) => (
                        <div className='task' key={todo._id}>
                            <div className='checkbox'>
                                {taskid === todo._id ?
                                    <input type='text' value={updatetask} onChange={e => setUpdatetask(e.target.value)} />
                                    :
                                    <p className={todo.done ? 'through' : 'normal'}>{todo.task}</p>
                                }
                            </div>
                            <div>
                                <span>
                                    <BsPencil className='icon' onClick={() => {
                                        if (taskid === todo._id) {
                                            Update(todo._id, updatetask);
                                        } else {
                                            setTaskid(todo._id);
                                            setUpdatetask(todo.task);
                                        }
                                    }} />
                                    <BsFillTrashFill className='icon' onClick={() => Hdelete(todo._id)} />
                                </span>
                            </div>
                        </div>
                    ))
            }
        </main>
    );
};

export default Home;
