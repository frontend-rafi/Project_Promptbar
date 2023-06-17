import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectedDb } from "@/utils/database";
import User from "@/models/user";
const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:'697869442851-ef6g2fdve80mnravkfqt45p230m7q0ps.apps.googleusercontent.com',
            clientSecret:"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" ,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }},
        })
    ],
callbacks:{
    async session({session}){
        const sessionUser = await User.findOne({
            email:session.user.email
        })
        session.user.id= sessionUser._id.toString();
        return session
            },
        
            async signIn ({profile}){
        try {
            await connectedDb();
            
            //check user exist 
        const userExists = await User.findOne({
            email:profile.email
        },
      
        
        ) 
            //check if not create a user
            if(!userExists){
                await User.create({
                    email:profile.email,
                    username:profile.name.replace(" ","").toLowerCase(),
                    image:profile.picture
                })
            }
            return true
        } catch (error) {
            console.log(error);
            return false
        }
            }
}
   //
  


   //
})
export{handler as GET , handler as POST} 