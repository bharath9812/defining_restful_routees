const express = require('express')
const app = express();
const { v4: uuid } = require('uuid');
uuid();

// because we cant send patch reqs , this helps use to do
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// below two are builtin parsing-middleware fuctions
app.use(express.urlencoded({ extended: true })); //form parser: parsing of form data and it parses the incoming requests with url encoded payloads
app.use(express.json()); // it is a built-middleware fuctions and it parses the incoming requests with json payload


// to use views we need to set these three
app.set('view engine', 'ejs');
const path = require('path'); // for absolute path
app.set('views', path.join(__dirname, 'views')); // by using this we dont need to run code from index.js directory
// anyway its useful when developing big applications
                                                

let comments = [                                 
    {
        id:uuid(),
        username: 'Todd',
        comment: 'Lolo so funny'
    },
    {
        id:uuid(),
        username: 'Skyler',
        comment: 'I like to play football'
    },
    {
        id:uuid(),
        username: 'S8ernfao8u',
        comment: 'reddit is the best place'
    },
    {
        id:uuid(),
        username: 'dasfau7',
        comment: 'whoi hoi koi'
    }
]

//       NAME         PATH                    VERB            PURPOSE

//  1   Index      /comments                   GET      Display all comments
//  2   New        /comments/new               GET      Form to create new comment
//  3   Create     /comments                   POST     Creates new comment on server
//  4   Show       /comments/:id               GET      Details for one specific comment
//  5   Edit       /comments/:id/edit          GET      Form to edit specific comment
//  6   Update     /comments/:id               PATCH    Update specific comment on server
//  7   Destroy    /comments/:id               DELETE   Deletes specific item on server



// 1 : rest - READ
app.get('/comments', (req, res) => {
    res.render('comments/index.ejs',{comments}) // passing comments in an object
}) 

// 2 : REST - Create new
app.get('/comments/new', (req, res) => {
    res.render('comments/new.ejs')
})

// 3 : on submit a form
app.post("/comments", (req, res) => {
    const { username, comment } = req.body;
    comments.push({id:uuid(),username,comment});
   // console.log(req.body)
    // res.send("IT WORKED");
    res.redirect("/comments") // by specifying a path using redirect method, the response it genereated, include 
                    // a redirect statys code, we can provide our own code
                        // and response also will include '/comments' under location header which the browser will use

})

// 4 : show routes

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', {comment} );
})

// 5 : EDIT;

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment= comments.find(c => c.id === id)
    res.render('comments/edit', { comment });
    
})

// 6: UPDATE
// patch doesnt replace entire thing rather it patches/addes unlike put which replace entireity
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
    
})

// 7 : DELELTE

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    //const foundComment = comments.find(c => c.id === id);
    comments = comments.filter(c => c.id !== id);
    res.redirect ('/comments')
})


// app.get('/tacos', (req, res) => {
//     res.send('get response');
// })

// app.post('/tacos', (req, res) => {
//     const { top, qty } = req.body;
//     res.send(`ok,here is post response with topping  ${top} qty: ${qty}`);
    
// })

app.listen(3000, () => {
    console.log('on port 3000');
})