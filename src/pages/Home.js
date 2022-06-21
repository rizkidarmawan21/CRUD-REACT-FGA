import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BASEURL } from '../Url/baseUrl';

const Home = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [contacts, setContact] = useState([]);
    useEffect(() => {
        async function fetchData() {
            await axios.get(BASEURL).then((response) => {
                setContact(response.data.data);
            });
        }
        fetchData();
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
        axios.post(BASEURL, data).then((response) => {
                alert(response.data.meta.message);
                window.location.reload();
            })
            .catch(function (error) {
                alert('Create Failed');
            });
    }

    function handleDelete(id) {
        const confirm = window.confirm('Are you sure to delete this contact?');
        if (confirm) {
            axios.delete(BASEURL + '/' + id)
            .then((response) => {
                alert(response.data.meta.message);
                window.location.reload();
            }).catch(function (error) {
                alert('Delete Failed');
            })
        }
    }
    return (
        <div className="w-full">
            <h1 className="text-center my-3 text-[30px] font-bold">Aplikasi Todo List</h1>
            <div className="lg:w-1/2 sm:w-full w-full border border-slate-200 rounded-xl mx-auto shadow-md font-inter p-5">
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700">Tugas</span>

                        <input placeholder='Masukkan tugas' type="text" value={name} onChange={(e) => { handleNameChange(e) }} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "/>
                    </label>
                    <label className="block mt-2">
                        <span className="block text-sm font-medium text-slate-700">Nomor</span>

                        <input placeholder='Masukkan Deadline' type="date" value={phone} onChange={(e) => { handlePhoneChange(e) }} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "/>
                    </label>

                    <button type="submit"
                        className="my-4 inline-block px-2 py-1 bg-sky-600 text-white rounded-lg shadow-lg font-semibold text-sm sm:text-base tracking-wider">Simpan</button>
                </form>

                <hr />
                <h2 className="text-center mt-3">Data Todolist</h2>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="border-b">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                #
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Tugas
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Deadline
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contacts.map((contact,index) => {
                                            return (
                                                <tr className="border-b" key={contact.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{1 + index}</td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {contact.name}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {contact.phone}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <Link to={"/edit/"+contact.id} className="text-white bg-yellow-500 px-3 py-1 rounded-full hover:text-gray-900 mr-3">
                                                            Edit
                                                        </Link>
                                                        <button onClick={() => { handleDelete(contact.id) }} className="text-white bg-red-500 px-3 py-1 rounded-full hover:text-gray-900">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>

                                            )
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home
