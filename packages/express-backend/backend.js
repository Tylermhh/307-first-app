import express from "express";
import cors from "cors";
import userServices from "./user-services.js";


const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// app.get("/users", (req, res) => {
//     res.send(users);
//   });
  

// const users = {
//   users_list: [
//     {
//       id: "xyz789",
//       name: "Charlie",
//       job: "Janitor",
//     },
//     {
//       id: "abc123",
//       name: "Mac",
//       job: "Bouncer",
//     },
//     {
//       id: "ppp222",
//       name: "Mac",
//       job: "Professor",
//     },
//     {
//       id: "yat999",
//       name: "Dee",
//       job: "Aspring actress",
//     },
//     {
//       id: "zap555",
//       name: "Dennis",
//       job: "Bartender",
//     },
//   ],
// };

// const findUserByName = (name) => {
//   return users["users_list"].filter((user) => user["name"] === name);
// };



// const findUserByNameAndJob = (name, job) => {
//   return users["users_list"].filter((user) => user["name"] === name && user["job"] === job);
// };


//get users by name and job
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined && job != undefined){
    // let result = findUserByNameAndJob(name, job);
    // let result = userServices.findUserByNameAndJob(name, job);
    // result = { users_list: result };
    // res.send(result);

    userServices.findUserByNameAndJob(name, job)
      .then((result) => {
        res.send({users_list : result})  //not sure why i need to wrap it in users_list again. mayb not anymore after exercise 4 change
      })
      .catch((error) => {
        res.status(404).send("Resource not found.");
      })
  }

  else if (name != undefined) {
    // let result = findUserByName(name);
  //   let result = userServices.findUserByName(name);
  //   result = { users_list: result };
  //   res.send(result);
  // } else {
  //   res.send(users);
    userServices.findUserByName(name)
      .then((result) => {
        res.send({users_list : result}) //not sure why i need to wrap it in users_list again. mayb not anymore after exercise 4 change
      })
      .catch((error) => {
        res.status(404).send("Resource not found.");
      })
  }

  else{
    userServices.getUsers()
    .then((result) => {
      res.send({users_list : result}) //not sure why i need to wrap it in users_list again. mayb not anymore after exercise 4 change
    })
    .catch((error) => {
      res.status(404).send("Resource not found.");
    })
  }
});

// const findUserById = (id) =>
  // users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  // let result = findUserById(id);
  // let result = userServices.findUserById(id);
  // if (result === undefined) {
  //   res.status(404).send("Resource not found.");
  // } else {
  //   res.send(result);
  // }

  userServices.findUserById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(404).send("Resource not found.");
    })
});

// const addUser = (user) => {
//   user.id = generateID();
//   users["users_list"].push(user);
//   return user;
// };

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  // const updatedUser = addUser(userToAdd);
  // const updatedUser = userServices.addUser(userToAdd);
  // res.status(201).send(updatedUser);

  userServices.addUser(userToAdd)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((error) => {
      console.error(`Could not add User: ${error}`);
      res.status(404).send();
    })
});

//deleting
const removeUser = (user) => {
  return users["users_list"].splice(users["users_list"].indexOf(user), 1);
};

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id

  userServices.findByIdAndDelete(userIdToDelete)
    .then((result) => {
        console.log(`User with ID ${userIdToDelete} deleted successfully.`);
        res.status(204).send();
    })
    .catch((error) => {
        console.error(`Could not delete User: ${error}`);
        res.status(404).send("Resource not found.");
    });

  // let userToDelete = findUserById(id);

  // console.log(userToDelete);
  // if (userToDelete === undefined) {
  //   res.status(404).send("Resource not found.");
  // } else {
  //   removeUser(userToDelete)
  //   res.status(204).send();
  // }
});

//Generating ID on server
function generateID(){
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';

  // Generate 3 random letters
  const randomLetters = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');

  // Generate 3 random numbers
  const randomNumbers = Array.from({ length: 3 }, () => numbers[Math.floor(Math.random() * numbers.length)]).join('');

  // Combine letters and numbers to form the final ID
  const randomId = randomLetters + randomNumbers;

  return randomId;
}

