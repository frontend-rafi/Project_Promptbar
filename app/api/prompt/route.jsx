import {connectedDb} from '@/utils/database';
import Prompt from '@/models/prompt';

export const GET =async(req,res)=>{

try {
    await connectedDb();
const prompts =await Prompt.find({}).populate("creator");
return new Response(JSON.stringify(prompts),{
    status:201
})
} catch (error) {
    return new Response("Failed to fetch data",{
        status:501 }) 
}

}