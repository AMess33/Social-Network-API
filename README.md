# Social-Network-API

## Backend API for a Social Network

This repo contains the neccesary models, schemas, and routes for a fully functional Social Networking app.

- I wanted to build and test my CRUD routes in a NoSQL DATABASE.
- I built this to test my abilities as a backend web developer in a realistic working environment at a social networking company.
- This backend allows for the creation of users, thoughts, reactions, and a friends list for a social networking platform.
- I learned all the CRUD operations and how to properly use them within a NoSQL enviroment.

## Usage

[Demonstration of all working routes](https://drive.google.com/file/d/1bVoPZ1HZtVqXQRHlVZPnTi4uUOpUgExe/view)

From my terminal I am able to start a server and test all my CRUD operations in Insomnia. The video shows the succesful testing of Get routes for all users and thoughts, as well as specific users and thoughts based off of their ID keys. I also Demonstrate how to Create users, thoughts, reactions, and how to add a friend to your friends list. The put routes allow you to Update your user or thoughts. And finally, the various Delete routes. You can choose to delete a reaction and it will be removed from the reactions array on the thought it was associated with. You are able to remove a friend from your friends list, when doing so, you are also removed from that friend's friend list as well. When you delete a thought, its reactions are also deleted. When a user is deleted, all thoughts associated with that user are deleted as well.
