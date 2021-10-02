import React, { useContext } from 'react'
import Head from 'next/head'
import Nav from './Nav.js'
import CustomerNav from './CustomerNav'
import { AuthContext } from "../appState/AuthProvider"
import Script from 'next/script'

function PageLayout({ children }) {
    const { user, signout } = useContext(AuthContext)
    return (
        <div style={{ margin: "0" }}>
            <Head>
                <title>What the App</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" />
                <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" ></Script>
                <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossOrigin="anonymous"></Script>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {user && !user.status && <>
                <CustomerNav />
            </>}

            {user && user.status && <>
                <Nav />
            </>}
            {!user && <>
                <CustomerNav />
            </>}
            {children}
        </div>
    )
}

export default PageLayout
