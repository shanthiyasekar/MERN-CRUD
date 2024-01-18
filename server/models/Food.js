const mongoose=require('mongoose');

const FoodSchema=new mongoose.Schema({
    foodName:{
        type:String,
        required:true,
    },
    daysSinceIAte:{
        type:Number,
        required:true,
    },
});

module.exports=mongoose.model("Food",FoodSchema)