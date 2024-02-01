import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor",
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer",
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor",
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress",
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender",
      },
  ]);

  function removeOneCharacter(index, id){
    // const charcToRemove = characters.filter((character, i) => {
    //   return i === index;
    // });


    deleteCharacterFromBack(id)
    .then((res) => {
      if (res.status === 204){
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      }
    })
    .catch((error) => {
      console.log(error);
    })

    // const updated = characters.filter((character, i) => {
    //   return i !== index;
    // });
    // setCharacters(updated);
  }


  function deleteCharacterFromBack(id){
    const promise = fetch (`Http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
    return promise;
  }


  function fetchUsers(){
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {console.log(error);});
  }, []);

  function updateList(person) {
    // setCharacters([...characters, person]);
    postUser(person)
    .then((res) => { 
      if (res.status === 201) {
        console.log("status 201!");
        setCharacters([...characters, res.json()])}
      })
    .catch((error) => {
      console.log(error);
    })
  }

  function postUser(person){
    const promise = fetch ("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

  return (
    <div className="container">
      <Table 
        characterData = {characters} 
        removeCharacter = {removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;