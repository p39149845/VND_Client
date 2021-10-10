import React, { useState, useContext } from "react"
import Router from 'next/router'
import Link from 'next/link'
import { useMutation } from "@apollo/react-hooks"
import Cookies from "js-cookie"

import { AuthContext } from "../../appState/AuthProvider"
import { LOG_IN_USER } from "../gql/mutation"

function LogIn() {

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })

    const { setAuthUser } = useContext(AuthContext)

    const [login, { loading, error }] = useMutation(LOG_IN_USER, {
        variables: { ...userInfo },
        onCompleted: data => {
            if (data) {
                Cookies.set("jwt", data.login.jwt)
                setAuthUser(data.login.user)
                setUserInfo({
                    email: "",
                    password: ""
                })
                Router.push('/')
            }
        }
    })

    const handleChange = e => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        try {
            e.preventDefault()
            await login()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-cover-gray-100">
            <div className="max-w-md mx-auto bg-white shadow-xl border-1 rounded-md my-8">
                <div className="text-center text-gray-600 py-4 text-2xl">เข้าสู่ระบบ</div>
                <div className="flex justify-center mb-10">
                    <button type="button" className="flex items-center bg-gray-100 shadow-md border border-gray-200 rounded px-4 py-2 mr-2">
                        <svg className="fill-current text-gray-600 w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM7 6v2a3 3 0 1 0 6 0V6a3 3 0 1 0-6 0zm-3.65 8.44a8 8 0 0 0 13.3 0 15.94 15.94 0 0 0-13.3 0z" /></svg>
                        <a
                            className="text-indigo-700"
                            href='https://server492.herokuapp.com/auth/google'
                        >
                            Sign in with Google
                        </a>

                    </button>

                </div>
                <div className="bg-green-300 pt-8 pb-16">
                    <div className="text-center text-gray-600 mb-6">หรือเข้าสู่ระบบโดยใช้ Email และ Password</div>
                    <div className="w-4/5 mx-auto">
                        <div className="flex items-center bg-white rounded shadow-md mb-4">
                            <span className="px-3">
                                <svg className="fill-current text-gray-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14l3.63-2.9z" /></svg>
                            </span>
                            <input className="w-full h-12 focus:outline-none" type="email" name="email" placeholder="Email" value={userInfo.email} onChange={handleChange} />
                        </div>
                        <div className="flex items-center bg-white rounded shadow-md mb-4">
                            <span className="px-3">
                                <svg className="fill-current text-gray-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M4 8V6a6 6 0 1 1 12 0h-3v2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" /></svg>
                            </span>
                            <input className="w-full h-12 focus:outline-none" type="password" name="password" placeholder="Password" value={userInfo.password} onChange={handleChange} />
                        </div>
                        <button className="bg-indigo-600 block mx-auto text-white text-sm uppercase rounded shadow-md px-6 py-2" type='button' onClick={handleSubmit}>เข้าสู่ระบบ</button>
                    </div>
                </div>
            </div>
            <div className="w-30 m-auto text-center">
                {error && (
                    <p className="text-red-500">{error.graphQLErrors[0].message}</p>
                )}
            </div>
        </div>
    )
}

export default LogIn
