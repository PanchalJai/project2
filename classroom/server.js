const express = require("express");
const user = require("./routes/user.js");
const posts = require("./routes/posts.js");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOption = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
}

app.use('/',session(sessionOption));
app.use('/',flash());
app.use('/',(req,res,next)=> {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

app.get("/ragister", (req,res)=> {
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    if (name === "anonymous") {
        req.flash("error", "user not ragistered")
    }else {
        req.flash("success", "user ragistered successfully!");
    }
    
    res.redirect("/hello");
});

app.get("/hello", (req,res)=> {
    
    res.render("page.ejs", {name: req.session.name, msg: req.flash("success")});
});







//  app.get("/reqcount", (req,res)=> {
//     if(req.session.count) {
//         req.session.count++;
//     }else {
//         req.session.count = 1;
//     }
    
//     res.send(`You sent a request ${req.session.count} times`);
//  });

// app.get("/test", (req,res)=> {
//     res.send("test successful!");
// });

// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secratecode"));

// app.get("/getsignedcookies", (req,res)=> {
//     res.cookie("made-in", "India", {signed:true});
//     res.send("signed cookie sent");
// });

// app.get("/verify", (req,res) => {
//     console.log(req.signedCookies);
//     res.send("verified");

// });

// app.get("/getcookies", (req,res) => {
//     res.cookie("greet","namaste");
//     res.cookie("Gameof", "Thronos");
//     res.cookie("ned", "Stack");
//     res.send("send you some cookies!");
// })

// app.get("/greet", (req,res)=> {
//     let {name = "anonymus"} = req.cookies;
//     res.send(`Hi, ${name}`);

// })

// app.get("/", (req,res)=> {
//     console.dir(req.cookies);
//     res.send("Hi,I am root!");
// });

// app.use('/user', user);
// app.use('/posts', posts);




app.listen(3000, () => {
    console.log("server is listening at 3000");
});