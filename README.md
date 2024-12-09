UNREALIABLE STORAGE METHODS OF INFORMATION
FOOD V MAN
THE OFFICIAL DATABASE

This app works as the database for all kinds of information on the games I have been making on my spare time.
I decided to use React router to split the app into multiple pages. Right now the only page that is operational is the Characters-page, which can be used to read and edit information in the Mongo database.

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
