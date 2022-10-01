# Sprint 9 Events App

This App mainly utilizes [Ticketmaster's Discovery API](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/), [MapBox Geocoding Places API](https://docs.mapbox.com/api/search/geocoding/), and [Mapbox's GL JS library](https://docs.mapbox.com/#maps) to allow users to retrieve local events, and then search for events around the world. The Back-end developed in Node and Express with MongoDB as the database allows users to employ CRUD operations on three collections of Users, Events, and Maps.


## **Preview**
## ![preview gif](src/assets/EZorro-preview.gif)

---

## :wrench: **Tech used in this project**
Front-End: Angular with [Angular Material](https://material.angular.io/) is used for the front-end UI Components. Additional Frontend components include [Angular Flex Layout](https://github.com/angular/flex-layout) and [Keen-Slider](https://keen-slider.io/). I also extensively used Illustrator and Photoshop to create wireframe sketches for the web application's design.

Back-End: Node and Express comprise the backend, and the database is served with MongoDB. Other packages include [bcrypt.js](https://www.npmjs.com/package/bcryptjs), cors, [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), [express-validator](https://express-validator.github.io/docs/), and [mongoose](https://www.npmjs.com/package/mongoose).

### Built With

* ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
* [![Express.JS][Express.js]][Expressjs-url]
* ![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
* [![Node.JS][Node.js]][Node-url]
* [![MapBox][MapBox.com]][Mapbox-url]
* ![MaterialUI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)

Tools Used: 
* ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
* ![Illustrator](https://img.shields.io/badge/Adobe%20Illustrator-FF9A00?style=for-the-badge&logo=adobe%20illustrator&logoColor=white)

APIs Used: 
* ![TicketMaster](https://img.shields.io/badge/TicketMaster%20Discovery-0592CD?style=for-the-badge)
* [![MapBox][MapBox-places]][Mapbox-url]

---

## :mortar_board: **What did I learn from this project**

In this project I learned how to obtain the user's location upon initialization and then allow for asynchronous calls to both Mapbox's Geocoding Places API and TicketMaster's API to obtain Events. Extensively, I learned how to develop within Mapbox's extensive library and thus implement custom map functions, overall map styling, and custom styling of the map Markers.

I was able to combine Angular Material's autocomplete component with a call to Mapbox's Geocoding Places API to load a list of world places whenever a user used the main search bar.

Due to the breadth of the API responses from Ticketmaster's API, I learned how to properly structure the interfaces for the API responses and then apply that to the custom Backend API routes.

---

<!-- ROADMAP -->
## Roadmap

- [ ] Add Dashboard Components for saved maps.
- [ ] Add additional functionality to map to save individual markers to User's saved maps.
- [ ] Implement more helpful UI features such as modal asking a user to confirm when they either add or delete Events or Maps.
- [ ] Implement edit feature on each Saved Event whereby the User can create a unique note about the saved event.
- [ ] Implement working calendar feature that automatically populates User's Calendar with the dates of their saved events.
- [ ] Implement advanced filtering for the user's saved events based on dates, location, and event type.
- [ ] Add ability for Users to search Users of app and add them to Friends.
- [ ] Create a "friends" key for each User to store individaul User's friends and show if Friend is interested in the same events.
- [ ] Add dashboard feature to put User's interests so that suggested Events based on User's preferences appear.
- [ ] Add "components" document to easily copy & paste sections of the readme.
- [ ] Additional styling to featured and my events cards.
- [ ] Refactor the code.


See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## :seedling: **Getting Started with this project**

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Installation

Clone or fork the Repo, and ensure that you have the [Angular CLI](https://github.com/angular/angular-cli) installed.

In the project directory.

```bash
npm install
```

In the project directory.

```bash
ng serve --open
```

## :bookmark_tabs: **Usage Instructions**

### Featured Events:
Upon starting the client server, The app will attempt to retrieve the user location. Upon successful retrieval of user location, the app will automatically load 10 cards of events nearby. The user may also search for a location anywhere in the world, and the app will update with events near that new location. The user is able to get additional information on a separate page or add that event to their "My Event" section if they are logged in. In the bottom is a "Load More Events" button where the user can load 10 additional events on mouse click.

## ![Featured demo](src/assets/Featured-demo.gif)

### Map Functionality:
Below is the map section whereby a map will be loaded with the center point being the user's location. On initialization 40 events are loaded on the map and each user can click on the markers to retrieve additional information or they may save the event if they are logged in.


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en//
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00

[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Expressjs-url]: https://expressjs.com/en/guide/routing.html

[MapBox-places]: https://img.shields.io/badge/MapBox%20Places-000000?style=for-the-badge&logo=mapbox&logoColor=white
[MapBox.com]: https://img.shields.io/badge/MapBox-000000?style=for-the-badge&logo=mapbox&logoColor=white
[Mapbox-url]: https://www.mapbox.com/
