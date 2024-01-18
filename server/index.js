const express = require('express');
const cors = require('cors');

const mongoose=require('mongoose');
require('dotenv').config();



const FoodModel=require('../server/models/Food')
const app=express();
const PORT = process.env.PORT || 3001;


app.use(express.json())//this allows us to receive information from the frontend in json format
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDb connected'))
.catch((err) => console.log('Error connecting to MongoDB:', err));

app.post("/insert",async(req,res)=>{
    const foodName=req.body.foodName;
    const days=req.body.daysSinceIAte
    const food=new FoodModel({foodName:foodName,daysSinceIAte:days});
    try{
        await food.save();
        console.log("inserted",res.data);
        res.send("Inserted successfully");
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Error inserting data");
    }
})

app.get("/read",async(req,res)=>
{
    try {
        const result = await FoodModel.find({}).exec();
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
})

app.put("/update",async(req,res)=>{
    const newFoodName=req.body.newFoodName;
    const id=req.body.id;

    try {
        const updatedFood = await FoodModel.findByIdAndUpdate(id, { foodName: newFoodName }, { new: true });
        res.send("Updated successfully");
      } catch (err) {
        console.log(err);
        res.status(500).send("Error updating data");
      }
})

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const deletedFood = await FoodModel.findByIdAndRemove(id);
      if (!deletedFood) {
        return res.status(404).send("Food not found");
      }
  
      res.send("Deleted successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting data");
    }
  });
  
app.listen(PORT,() => console.log(`Listening at ${PORT}`))



