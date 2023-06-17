import {connectedDb} from '@/utils/database';
import Prompt from '@/models/prompt';

export const GET =async(req,{params})=>{
//  who are logged in and who created post, who's id
try {
    await connectedDb();
const prompts =await Prompt.find({ creator:params.id }).populate("creator");
return new Response(JSON.stringify(prompts),{
    status:201
})
} catch (error) {
    return new Response("Failed to fetch data",{
        status:501 }) 
}

}



