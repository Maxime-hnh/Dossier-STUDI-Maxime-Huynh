import React, { useState, useEffect } from 'react'
import useWindowWidth from '../../../Hooks/useWindowWidth'
import NavBarAdmin from '../NavBarAdmin/NavBarAdmin'
import { AiFillPlusCircle } from 'react-icons/ai'
import AddUserModal from './AddUserModal'
import { Modal } from 'react-bulma-components';
import { MdDeleteForever } from 'react-icons/md'
import './UsersPage.css'


export default function UsersPage() {

    const width = useWindowWidth()
    const token = localStorage.getItem('token');
    const [users, setUsers] = useState([]);

    const [openAddUserModal, setOpenAddUserModal] = useState(false)
    const handleOpenAddUser = () => {
        setOpenAddUserModal(!openAddUserModal)
    }

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetch('http://localhost:8000/user', {
                    method: 'GET',
                    headers: {
                        'x-access-token': token,
                    }
                })
                if (response.ok) {
                    const users = await response.json()
                    setUsers(users)
                } else {
                    console.log('Échec de récupération des informations des évènements');
                }
            } catch (error) {
                console.error(error);
            };
        }
        getUsers();
    }, [token]);


    const deleteUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8000/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'x-access-token': token
                }
            })
            if (response.ok) {
                setUsers((prevUsers) => {
                    const updatedUsers = prevUsers.filter((user) => user.id !== userId)
                    return updatedUsers
                })
            } else {
                console.error("Erreur lors de la suppression de l'utilisateur ");
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la suppression de l'utilisateur :", error);
        }
    };

    const addUser = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
    };

    return (
        <>
            <NavBarAdmin />
            < div breakpoint='fluid' className={` usersPage-container ${width > 1023 ? 'usersPage-desktop' : 'usersPage-mobile'}`}>
                <div className='updateContent-container'>

                    <h1 className='AdminPage-title mb-4'>Gérer les <span>utilisateurs</span></h1>
                    <div className="p-5">
                        <table className="table is-stripped is-hoverable is-fullwidth">
                            <thead>
                                <tr>
                                    <th className='is-hidden-mobile' title="id">#</th>
                                    <th title="firstName" className='has-text-centered'>Prénom</th>
                                    <th title="lastName" className='has-text-centered'>Nom</th>
                                    <th title="email" className='has-text-centered is-hidden-mobile'>Email</th>
                                    <th className='has-text-centered'>
                                        <AiFillPlusCircle
                                            className="is-clickable"
                                            onClick={handleOpenAddUser}
                                            color='green'
                                            size={25}
                                        />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && (users.map((user) => (

                                    <tr key={user.id}>
                                        <th className='is-hidden-mobile'>{user.id}</th>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td className='is-hidden-mobile'>{user.email}</td>
                                        <td>
                                            {user.role === 'admin' ? '' :
                                                <a href="#delete"
                                                    className='pl-2'
                                                    onClick={(() => { deleteUser(user.id) })}
                                                >
                                                    <MdDeleteForever color='#F14668' size={24} />
                                                </a>
                                            }
                                        </td>
                                    </tr>
                                )))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
            <Modal show={openAddUserModal} onClose={() => setOpenAddUserModal(false)}>
                <AddUserModal onUserCreated={addUser} handleOpenAddUser={handleOpenAddUser} />
            </Modal>
        </>
    )
}
