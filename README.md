# nodechan-react
A nodechan refactor using React.js as a front-end.

**Current to-do**

+ Fix vulnerabilities issues, this project was started a long time ago, abandoned, and recently revived, and these issues haven't been touched yet.
+ Create .env file to hold urls of node server
+ Right now, Nodechan React generates a list of boards, by boardcode, to put at the top and bottom of the page. The <BoardMenu /> component calls the API from within. It needs to be called by the Component that <BoardMenu /> is placed into, so that there is only 1 API call per rendering of the page, instead of 1 API call for the Top and 1 API call for the bottom menu.
+ Post forms for new threads/replies
+ [Return] [Catalog] [Bottom] [Update] buttons (only catalog if add support for page rendering)
    + When adding default view, move makePost(post) function to outside module that can be called by multiple components
    + When adding default view, move Boards.js to Catalog.js, make new Boards.js, leave Thread.js as is, but clean it up and have it call the makePost(post) from the module.
+ Thread MetaData
+ Delete Post (fix functionality on original nodechan site, this is currently one of the longest running issues that needs to be fixed)

**Just Finished**

+ Board Banners
+ Calls API to get list of current boards, makes top/bottom board menus
+ Calls API to get list of current threads 
    + Renders Catalog as board view, no current support for default view
+ Calls API to get all current posts in a thread
