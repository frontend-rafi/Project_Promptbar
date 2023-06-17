import mongoose from 'mongoose';

let isConnected= false;

export const connectedDb = async ()=>{
    mongoose.set("strictQuery",true);

    if(isConnected){
console.log("mongodb is Connected");
return;
    }

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017",{
           
dbName:"prompt_share",
 useNewUrlParser: true,
useUnifiedTopology: true,
    

        })
        console.log("mongodb is Connected");
    } catch (error) {
        console.log(error);
    }
}
