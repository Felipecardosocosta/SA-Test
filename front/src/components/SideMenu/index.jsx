import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'

import {
    MdDashboard,
    MdExitToApp,
    MdMenu,
    MdClose
} from "react-icons/md"

import {
    FaUserPlus,
    FaListAlt,
    FaCalendarCheck
} from "react-icons/fa"
import { useAuth } from '../../contexts/AuthContext'

const SideMenu = () => {

    const navigate = useNavigate()

    const { logout } = useAuth()


    const [isCollapsed, setIsCollapsed] = useState(false)

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    const toggleMenu = () => {

        setIsCollapsed(!isCollapsed)
    }


    return (
        <aside
            className={`
        h-screen bg-cyan-800 text-white flex flex-col justify-between transition-all duration-300  ${isCollapsed ? "w-15" : "w-64"}`}
        >
            <div className='p-4 flex items-center justify-between border-b border-cyan-700' >
                {
                    !isCollapsed && (
                        <h1 className='test-lg font-bold'>Clinica +</h1>
                    )
                }
                <button
                    className='text-white hover:text-cyan-300 focus:outline-none'
                    onClick={toggleMenu}
                >
                    {isCollapsed ?
                        <MdMenu size={24} />: 
                        <MdClose size={24} />

                    }

                </button>

            </div>



            <nav className='flex-1 p-4 space-y-4 overflow-y-auto'>
                <ul className='space-y-3 '>
                    <li>
                        <Link 
                        to={"/home"}
                        className='flex items-center gap-3 hover:text-cyan-300'
                        
                        > 
                        <MdDashboard
                        size={20}
                        />
                        {!isCollapsed && <span>Inicio</span>}
                        
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to={"/patients"}
                        className='flex items-center gap-3 hover:text-cyan-300'
                        
                        > 
                        <FaUserPlus
                        size={20}
                        />
                        {!isCollapsed && <span>Pacientes</span>}
                        
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to={"/consults"}
                        className='flex items-center gap-3 hover:text-cyan-300'
                        
                        > 
                        <FaCalendarCheck
                        size={20}
                        />
                        {!isCollapsed && <span>Consultas</span>}
                        
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to={"/exams"}
                        className='flex items-center gap-3 hover:text-cyan-300'
                        
                        > 
                        <FaListAlt
                        size={20}
                        />
                        {!isCollapsed && <span>Exame</span>}
                        
                        </Link>
                    </li>






                </ul>

            </nav>


            <div className='p-4 border-t border-cyan-700'>
                <button
                    onClick={handleLogout}
                    className='flex items-center gap-3 text-red-300  hover:text-red-400 w-full cursor-pointer'
                >
                    <MdExitToApp size={20} />
                    {!isCollapsed && <span>Sair</span>}
                </button>
            </div>



        </aside>
    )
}

export default SideMenu