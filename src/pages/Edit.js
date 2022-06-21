import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { BASEURL } from '../Url/baseUrl';

export const Edit = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const { id } = useParams();

    useEffect(() => {
        axios.get(BASEURL + '?id=' + id).
        then((response) => {
            setName(response.data.data.name);
            setPhone(response.data.data.phone);
        })
            
    }, [0]);

    const handleNameChange = (e) => {
        const nameValue = e.target.value;
        setName(nameValue);
    }
    const handlePhoneChange = (e) => {
        const phoneValue = e.target.value;
        setPhone(phoneValue);
    }
    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            name: name,
            phone: phone
        }
        axios.put(BASEURL+"/"+id, data).then((response) => {
                alert(response.data.meta.message);
                window.location.href = "/";
            })
            .catch(function (error) {
                alert('Create Failed');
            });
    }


    return (
        <div className='w-80' >
            <h1 className='text-lg font-bold my-5' >Halaman Edit</h1>
            <form onSubmit={(e) => { handleSubmit(e) }}>
                <label className="block">
                    <span className="block text-sm font-medium text-slate-700">Tugas</span>

                    <input type="text" value={name} onChange={(e) => { handleNameChange(e) }} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "/>
                </label>
                <label className="block mt-2">
                    <span className="block text-sm font-medium text-slate-700">Edit</span>

                    <input type="date" value={phone} onChange={(e) => { handlePhoneChange(e) }} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "/>
                </label>

                <button type="submit"
                    className="my-4 inline-block px-2 py-1 bg-sky-600 text-white rounded-full shadow-lg font-semibold text-sm sm:text-base tracking-wider">Edit</button>
                <Link to="/" className="ml-3 text-white bg-yellow-500 px-3 py-1 rounded-full hover:text-gray-900 mr-3">
                                                            Kembali
                                                        </Link>
            </form>
        </div>
    )
}
