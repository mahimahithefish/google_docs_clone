# Docs Clone
Created a full-stack web application to recreate Google Docs using firebase, JavaScript, and react

## Tech Stack
* Frontend: React, Material-UI
* Backend : Firebase

## Features 
### Sign-in Page
Firebase was used for user authorization that allowed users to login to the google docs web application using their google email.

<img src="https://github.com/mahimahithefish/docs_clone-/blob/main/images/login.png" width="300" height="200">


### Home page 
After signing in users have the option to logout or create a new document. the "+ Create a new Document" button will toggle a container that allows for users to enter the title of of new doecument. This button is from Material-ui. 

<img src="https://github.com/mahimahithefish/docs_clone-/blob/main/images/Home.png" width="300" height="200">

After a new document is created, users willl be notified wether or not it was a sucess on the side using Toast nothifications (Notification not shown). Uisng CSS styling, we able to display all the created documents in a grid-like manner. All the documents that are created can be viewed in firebase.


<img src="https://github.com/mahimahithefish/docs_clone-/blob/main/images/home2.png" width="300" height="200">


### Editor 
When clicking on a document, the user is allowed to add body text.

<img src="https://github.com/mahimahithefish/docs_clone-/blob/main/images/Editor.png" width="300" height="200">



<img src="https://github.com/mahimahithefish/docs_clone-/blob/main/images/helloworld!.png" width="300" height="200">

Using Toast notifications, users will be informed within the web-app after the document has been updated 



## Resources
* [Material-ui](https://mui.com)
* [Similar Google Docs clone](https://www.freecodecamp.org/news/build-a-google-docs-clone-with-react-and-firebase/)
* [SandBox](https://codesandbox.io/dashboard/home?workspace=34567d70-9b19-4da0-ad38-1724a11f39bc)
### Libraries
* React router : allows to have multiple pages in the webapp
* Google fonts: font styling
* React Quill : Text editor window
* React-dom
* Toastify
* materials-ui icons

