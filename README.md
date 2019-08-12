# nodechan-react
A nodechan refactor using React.js as a front-end.

## Getting Started
Nodechan-react requires an API running on the backend. It was built using the standard Nodechan API running on an instance of the original Nodechan server.

**Current to-do**


+ Add relevant span if user is banned
+ Create .env file to hold urls of node server
+ Need to keep track of/ navigate by page on Boards view
+ Need to add javascript in page functionality to:
    + Post forms for new threads/replies need js to send relevant ajax requests and update/rerender page based on returned date
    + Delete Post (fix functionality on original nodechan site, this is currently one of the longest running issues that needs to be fixed)
    + Need to fix href warnings/placeholder link warnings, rewrite javascript to work on <p> tags and not </a> tags to get rid of placeholder links

**Just Finished**

+ Board Banners, navigation buttons
+ Added Catalog page, Board page, Thread page, rendering exactly as they should without issue
+ Calls API for all relevant information
+ Phased out ReactHtmlParser
+ Threads render posts, metadata and buttons up top and bottom
+ Fixed front page CSS
