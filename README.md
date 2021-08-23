UI Framework used:
1] Material UI
2] Bootstrap 4 (No JS/Jquery, Only CSS has been imported)

Additional NPM packages used:
1] Moment
2] React router dom

Design methodology used:
1] Atomic design

Firstly, I have created the folder structure based on the Atomic design. The low level components like buttons, inputs have been placed under the folder "atoms". No code logic is written here.

The "organisms" folder exports the base components like Card and Header.

The "routes" folder exports all the site paths. Currently only setup to display "/home"

The "views" folder would store all the pages that would be viewed by a user. In this case only home is being shown.

The "Utils" folder stores a js and a css files, which exports commonly used functions and commonly used css respectively.

Following is the approach being used to write the code logic.

The 'Card" component receives the props sent from the "CardList" component which also maps the card in order to show multiple cards or show a "NoRecordsFound" component in case of no matching keyword entered in the search bar.


The 'Home' component is where the API is being called to fetch the details.

Function fetchData is used to make the API call.
Apart from the token, 3 other params are being passed to the url.
1] language- To get the language based on user selection. Default has been set to English(en).
2] itemsToShow- The UI currently would show 3 cards and would render more once the user clicks the "Load more" button. To render more components the variable "itemsToShow" is being set to 3 + current_no_of_items.
3] page- This has been set to a static 1 as to modify this would require a pro/premium membership of gnews.io.

Function updateInput is used to get the user input from the SearchBar component and render cards accordingly.

A useEffect has been set to re-render fetchData everytime there is a change in language or itemsToShow.

Finally, The data is being sent to "SearchBar" and "CardList" component.