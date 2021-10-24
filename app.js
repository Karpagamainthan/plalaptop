require("dotenv").config();
require("./model/db").connect();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const express = require("express");
const app=express();

const brand = require('./controller/brand');
const customer = require('./controller/customer');

app.use(express.json);

app.post("/insertpro",async(req,res)=>
{
    try {
        const { brand_name,ram,rom,price,processor,os,color,cus_rating} = req.body;
        
        if (!(brand_name && ram && rom && price && processor && os && color && cus_rating)) {
            res.status(400).send("All fields are required");
        }

        const ins = await brand.create({
            brand_name,ram,rom,price,processor,os,color,cus_rating
        });
        
        res.status(201).json(ins);
    } catch (err) {
        console.log(err);
    }
});


app.post("/register", async (req, res) => {

    try {
      const { first_name, last_name, email, password } = req.body;
      
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
      }
      const alemail = await customer.findOne({ email });
  
      if (alemail) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      encryptedPassword = await bcrypt.hash(password, 10);
  
      const user = await customer.create({
        first_name,
        last_name,
        email: email.toLowerCase(), 
        password: encryptedPassword,
      });
  
      
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  });
  const { API_PORT } = process.env;
  const port = process.env.PORT || API_PORT;
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  