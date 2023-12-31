
const express = require('express')
const bodyParser = require("body-parser")
const date =require(__dirname+"/date.js")
const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://abizynelies9:THEBOYSARECOMING@cluster0.lo0yq9v.mongodb.net/todolistDB?retryWrites=true&w=majority")

const port = process.env.PORT || 3000

const app = express()
app.set('view engine', 'ejs');


 app.use(express.static("public"))
 app.use(bodyParser.urlencoded({extended:true}));


const nameSchema = new mongoose.Schema({
    name:String
})
const nameModel =mongoose.model("nameModel",nameSchema)
  const name1 = new nameModel({
    name:"Enter names here"
  })
  const name2 = new nameModel({
    name:"Hey here!!"
  })

 
 
  const defaultItems =[name1,name2]
 nameModel.insertMany(defaultItems)

// let box=[]

app.get("/", function(req, res) {

  let day = date()
 
  res.render("list",{listTitle: day, Itemlist:defaultItems}) 
 
  })

  const listSchema = new mongoose.Schema({
    name:String,
    items:[nameSchema]
})
 
const listmodel =mongoose.model("listmodel",listSchema) 

 
  app.get("/:nextList", function(req, res) {
      const cuslist = req.params.nextList

      const newlist = new listmodel({
        name: cuslist,
        items:defaultItems
      })
      
      listmodel.findOne({name:cuslist}) .then(async(listmodel)=>{
        if (listmodel){
          console.log("already exit")
        }else{
          console.log("dont exit")
          newlist.save()    
        }
      })
      
    })
 
  
  app.post("/", function(req, res) {
    const Nameout = (req.body.foodType)  
    const name3 = new nameModel({
      name:Nameout
     
    }) 

    defaultItems.push(name3)
    name3.save()
    res.redirect("/")
 
} ) 

app.post("/delete", function(req, res) {
  const chec = (req.body.checkname) 
  nameModel.deleteOne({name:chec}) .then(async(nameModel)=>{
    if (nameModel){
      console.log("deleted")
      defaultItems.pop(chec)
      res.redirect("/")  
    }else{
      console.log("not deleted")
      nameModel.save() 
      
    }
   
   
  })




    
  }) 

 

// app.get("/work", function(req, res) {
//    res.render("list",{listTitle: "work list", Itemlist:workitems})
// })
// // app.post("/work",function (req, res) {
//     let items = (req.body.foodType)
//     workitems.push(items)
//     res.redirect("/work")
// })

app.get("/about",function (req, res) {
    res.render("about")
})

 app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})