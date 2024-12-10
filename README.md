***************************QUICKLY! BEFORE IT BREAKS!***************************

Managed to get the thing hosted after another 5 hours. I'm pretty sure I spend more time fighting with render.com than coding the damn thing.
For the whole evening backend and frontend took turns breaking, but finally both are working at the same time. (At least at the time when I'm writing this.)

Frontend:

https://foodvman-database.netlify.app/


Backend: No point opening this. It just calls you dumbass for not having proper command. (Developer-only info)

https://fvm-character-database-production.up.railway.app/


The entire thing is barely holding together by tears and duct-tape. The server code is based on the "this-is-the-one-that-works" -branch, and the front is in "updated-frontend". I am planning to merge everything together at some point, but right now I am too scared.

This has been real challenge and a learning experience. I wouldn't have guessed the actually difficult part is the server hosting.



********************************************************************************



UNREALIABLE STORAGE METHODS OF INFORMATION

FOOD V MAN

THE OFFICIAL DATABASE


This app works as the database for all kinds of information on the games I have been making on my spare time.
I decided to use React router to split the app into multiple pages. Right now the only page that is operational is the Characters-page, which can be used to read and edit information in the Mongo database.
Had to remove the whole routes thing to get the hosting working properly.

The build that is working right now consists of
 Characters -page,
 CharacterDetails -component,
 CharacterForm -component,
 ApiContext -component

Characters

 This is the main page. Whenever it loads it makes the gatall-call for the server, and uses the response to make a list of characters.
 If a character is selected, rest of the information is shown at the right side of the screen in a CharacterDetails -component.
 The CharacterPage includes the "Add New" button, that opens a submit form in "Add"-mode. It also includes the code for "Edit"- and "Delete" -buttons, but those to are added to the page in the CharacterDetails -component.


CharacterDetails

 This displays all of the character details as well as the edit and delete -buttons for the selected character.


CharacterForm

 This is the form that is used to edit the database. It has two modes: "Add" and "Edit". Other than the different API call, the biggest difference between them is that in "Edit"-mode the text inputs are prefilled with the old information.


ApiContext

 This component is used to determine the API address, which now is just render.com. The other logic, was mainly just to make debugging faster on my own PC.
