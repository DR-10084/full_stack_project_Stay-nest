const express = require("express");
const app=express();

console.log("MY CURRENT APP.JS IS RUNNING");
const mongoose= require ("mongoose");
const Listing = require("./models/listing.js");
const path=require("path");
const methodOverride= require("method-override")

const ejsMate = require ("ejs-mate"); // for navbar
app.engine('ejs', ejsMate); //for navbar
app.use(express.static(path.join(__dirname,"/public")));


const MONGO_URL="mongodb://127.0.0.1:27017/staynest";

//to call below main fn 
main().then(()=>{
    console.log("connected to DB")
})
.catch((err)=>{
    console.log(err);
});


//main function 
async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use (methodOverride("_method"));

//basic api 
app.get("/",(req,res)=>{
    res.send("hi, i am root");
})

//INDEX ROUTE
//  app.get("/listings", (req, res) => {
//      res.render("listings/index.ejs");
//  });

 app.get ("/listings", async (req,res)=>{
    const allListings= await Listing.find({})

 res.render("listings/index.ejs",{allListings});
 });

  //New Route --> open form 
 app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");

 });

 // CREATE ROUTE --> to accept form details 
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);

    await newListing.save();

    res.redirect("/listings");
});

 //SHOW ROUTE
 app.get("/listings/:id", async(req,res)=>{
    let{id}=req.params;
    const listing= await Listing.findById(id); // now here whatever data will come we will pass thatto show.ejs 
    res.render("listings/show.ejs", {listing});
 });

// Edit Route 
app.get("/listings/:id/edit",async(req,res)=>{
    let{id}=req.params;
    const listing= await Listing.findById(id); 
    res.render("listings/edit.ejs",{listing});

});

//update  route 
app.put("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect ("/listings");

});

//delete route 
app.delete("/listings/:id", async(req,res)=>{
    let {id}= req.params;
    let deletedListing =await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

//create a new route 
// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title: "My new Villa",
//         description:"By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });
//     await sampleListing.save();
// console.log("sample was saved");
// res.send("successfull testing");
// });


app.listen(8080,()=>{
    console.log("server is listening to port 8080");

});
