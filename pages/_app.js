// import App from 'next/app'
import { ApolloProvider } from "@apollo/react-hooks"
import fetch from "isomorphic-unfetch"
import cookie from "cookie"
import '../styles/globals.css'

import PageLayout from "../components/PageLayout"
import AuthProvider from "../appState/AuthProvider"
import apolloClient from "../apollo/apolloClient"

const QUERY_USER = {
  query: `
    query {
      user{
        status
        id
        name
        email
        workDay{
          date
        }
        review{
          star
          review
        }
        metadata{
          status
          userName
          user{
            id
            name
          }
        }
        vehicles{
          id
          description
        }
        requests{
          id
          country
          targetUser{
            id
            name
          }
      }
      }
    }
  `
}

function MyApp({ Component, pageProps, apollo, user }) {
  return (
    <ApolloProvider client={apollo}>
      <AuthProvider userData={user}>

        <PageLayout>
          <Component {...pageProps}/>
        </PageLayout>

      </AuthProvider>
    </ApolloProvider>
  )
}
MyApp.getInitialProps = async ({ ctx, router }) => {
  if (process.browser) {
    return __NEXT_DATA__.props.pageProps
  }
  const { headers } = ctx.req
  const cookies = headers && cookie.parse(headers.cookie || "")
  const token = cookies && cookies.jwt

  if (!token) {
    if (router.pathname === "/manageVehicle") {
      ctx.res.writeHead(302, { Location: "/signIn" })
      ctx.res.end()
    }
    return null
  }

  const response = await fetch("http://localhost:4000/graphql", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}` || ""
    },
    body: JSON.stringify(QUERY_USER),
  })

  if (response.ok) {
    const result = await response.json()
    const user = result.data.user
    return { user }
  }

  else return null
}

export default apolloClient(MyApp)