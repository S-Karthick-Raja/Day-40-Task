import express from "express";
import fs from "fs";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Server Created");
});

// createfile path to create a filename with current timestamp
app.get("/createfile", (req, res) => {
    let date = new Date();
    // replace "/" with "."
    // toUTCString is a method to get a timestamp
    date = date.toUTCString().replace(/\:/g, ".");
    console.log(date);
    // creating filename with current date-time.txt
    fs.writeFile(`files/${date}.txt`, date, (err) => {
        console.log("File created successfully");
    });
    res.send({ msg: "File created successfully" });
});

// To get all the files in specific folder
app.get("/readfile", (req, res) => {
    // change directory to get the files in folder
    fs.readdir("files", (err, date) => {
        if (err) {
            console.log(err);
            return res.status(404).send(err);
        } else {
            console.log(date)
            return res.send(date);
        }
    });
});

app.listen(PORT, console.log("Server started in:", PORT));