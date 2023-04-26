import NextAuth from "next-auth"

//Credit :: https://github.com/mguidetti/are.na-multiplexer
const authOptions = {
    providers: [
      {
        id: 'arena',
        name: 'Are.na',
        type: 'oauth',
        authorization: {
          url: 'https://dev.are.na/oauth/authorize',
          params: {
            scope: ''
          }
        },
        token: 'https://dev.are.na/oauth/token',
        userinfo: 'https://api.are.na/v2/me',
        clientId: process.env.ARENA_APP_ID,
        clientSecret: process.env.ARENA_APP_SECRET,
        profile: (profile) => {
          const data = {
            id: profile.id,
            username: profile.username,
            avatar: profile.avatar,
            initials: profile.initials
          }
  
          return data
        }
      }
    ],
    jwt: {
      secret: process.env.ARENA_APP_SECRET
    },
    callbacks: {
      async jwt ({ token, account, profile }) {
        // Persist the OAuth access_token and or the user id to the token right after signin
        if (account && profile) {
          token.accessToken = account.access_token
          token.id = profile.id
          token.name = profile.username
          token.image = profile.avatar
          token.initials = profile.initials
        }
  
        return token
      },
      async session ({ session, token }) {
        session.user.id = token.id
        session.user.accessToken = token.accessToken
        session.user.name = token.name
        session.user.image = token.image
        session.user.initials = token.initials
  
        return session
      }
    }
  }
  
  export default NextAuth(authOptions)