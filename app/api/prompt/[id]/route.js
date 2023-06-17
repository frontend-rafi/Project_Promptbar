import {connectedDb} from '@/utils/database';
import Prompt from '@/models/prompt';
// get 1 prompt

export const GET =async(req,{params})=>{

try {
    await connectedDb();
const prompt =await Prompt.findById(params.id).populate("creator");
if(!prompt) return new Response("prompt not found ",{status:404})
return new Response(JSON.stringify(prompt),{
    status:201
})
} catch (error) {
    return new Response("Failed to fetch data",{
        status:501 }) 
}

}

// PATCH (update)

export const PATCH =async(req,{params})=>{
    const {prompt,tag}= await req.json();

    try {
        connectedDb();
        // find the existing property byId
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt){
           return new Response("Prompt not found",{status:404})
        }
 // Update the prompt with new data
      existingPrompt.prompt = prompt;
      existingPrompt.tag = tag;

   await existingPrompt.save();
        }
     catch (error) {
        console.log(error);
        return new Response("Internal server error",{status:500})
    }

}

    



// DELETE

export const DELETE = async (req,{params})=>{
try {
    await connectedDb();
    await Prompt.findByIdAndRemove(params.id);
return new Response("Prompt Deleted Successfully",{status:200})
} catch (error) {
    return new Response("Prompt Deleted Failed",{status:500}) 
}
}


