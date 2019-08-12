# nodechan-react
A nodechan refactor using React.js as a front-end.

**Current to-do**

+ Need to fix "target=_blank" and href warnings
+ Finish the Boards component view, will require changing Posts component a bit
+ Add relevant span if user is banned
+ Create .env file to hold urls of node server
+ Post forms for new threads/replies need js to send relevant ajax requests and update/rerender page based on returned date
+ Delete Post (fix functionality on original nodechan site, this is currently one of the longest running issues that needs to be fixed)
+ Need to copy top nav bar to bottom after thread

**Just Finished**

+ Board Banners
+ Added Catalog page
+ Calls API to get list of current boards, makes top/bottom board menus
+ Calls API to get list of current threads 
    + Renders Catalog as board view, no current support for default view
+ Calls API to get all current posts in a thread
+ Phased out ReactHtmlParser for most components
+ Threads render posts, metadata and buttons up top

