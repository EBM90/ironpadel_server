# IronPadel

![IronPadel](<img src="/ironpadel_azul claro.png">)
<<<<<<< HEAD

=======
>>>>>>> 7dbe191d75084deb69fbb0ba30f70af909d5bac9
<img src="/ironpadel_azul claro.png">

## Description

Due to external reasons, IronHack has been forced to restrict entrance to the rooftop area. Because of this,
they have decided to build a paddle court. IronHackers will be able to book games through IronPadel and find
other IronHackers to play with, as well as earn achievements and checkout their statistics and others'.
<<<<<<< HEAD

=======
>>>>>>> 7dbe191d75084deb69fbb0ba30f70af909d5bac9

## User Stories

Sign-up
Log-in
Log-out
Home page (Notifications & My bookings)
Booking
Community
User Profile
CRUD bookings
CRUD profile

## MVP

The MVP will cover the following:
**CRUD**
**Sign-up / Log-in / Log-out**
**Public pages** - Home & Community
**Private pages** - User profile & Booking
<<<<<<< HEAD
**Five connected models** - User, Booking, Date, Notification and Achievement 
=======
**Five connected models** - User, Booking, Date, Notification and Achievement
>>>>>>> 7dbe191d75084deb69fbb0ba30f70af909d5bac9
**Three types of players** - Creator, Participant, Viewer
**Add new players**
**Responsive**

## Backlog

**Private and Public bookings**
**Close a booking**
**Achievements** - Mora badges
**Statistics** - More statistics
<<<<<<< HEAD
**In-game chat** 
=======
**In-game chat**
>>>>>>> 7dbe191d75084deb69fbb0ba30f70af909d5bac9
**Challenge other users**
**mini e-commerce**
**notifications for achievements**

## Tech challenge

**MERRRRRRRRN**
**Scheduling a booking**


## Structure

ironpadel-backend/

<<<<<<< HEAD
        ├── .gitignore
        ├── .env
        ├── package.json
        ├── app.js
        ├── README.md
        ├── bin
        │   └── www
        ├── config
        │   └── cloudinary.js
        ├── helpers
        │   └── middlewares.js
        ├── models
        │   ├── User.js
        │   ├── Booking.js
        │   ├── Date.js
        │   ├── Notification.js
        │   └── Achievement.js
        ├── public
        └── routes
=======
    ├── .gitignore
    ├── .env
    ├── package.json
    ├── app.js
    ├── README.md
    ├── bin
    │     └── www
    ├── config
    │     └── cloudinary.js
    ├── helpers
    │     └── middlewares.js
    ├── models
    │      ├── User.js
    │      ├── Booking.js
    │      ├── Date.js
    │      ├── Notification.js
    │      └── Achievement.js
    ├── public
    └── routes
>>>>>>> 7dbe191d75084deb69fbb0ba30f70af909d5bac9
            ├── home.js
            ├── auth.js
            ├── community.js
            └── private
<<<<<<< HEAD
                ├── user.js
                └── booking.js
=======
                 ├── user.js
                 └── booking.js
>>>>>>> 7dbe191d75084deb69fbb0ba30f70af909d5bac9

**Frontend structure to added in the near future**

## Routes

**public**
_auth_
POST/auth/login Sends Login form data to the server.{ username, password }
POST/auth/signup Sends SignUp info to the server and creates user in the DB.{ username, email, password }
POST/auth/logout Destroys user's session
GET /auth/me Gets the information of the user currently logged in
<<<<<<< HEAD

_home_
Get/home/main Gets the information of the loggedIn user.
POST/delete-notification/:id Deletes the notification. {username, email, description, image, bookings, wins, notifications, achievements}

_community_
Get/community Gets the information of all the bookings. {name, hour, creator, players, winners, losers}


=======
_home_
Get/home/main Gets the information of the loggedIn user.
POST/delete-notification/:id Deletes the notification. {username, email, description, image, bookings, wins, notifications, achievements}
_community_
Get/community Gets the information of all the bookings. {name, hour, creator, players, winners, losers}
>>>>>>> 7dbe191d75084deb69fbb0ba30f70af909d5bac9
**private**
_user_
GET/profile Gets information of the current user. {username, email, description, image, bookings, wins, notifications, achievements}
GET/profile/:id Gets the information of the user. {username, email, description, image, achievements}
POST/profile/:id Sends updated information of the user. {username, email, description, image}
POST/profile/uploadpicture Sends updated information of the image the user has sent to uploaded.
<<<<<<< HEAD


_booking_
Get/booking Gets the available dates. {available, month, day}
POST/booking Creates a new booking with the details of said booking. {name, hour, creator, players, winners, losers}
Get/booking/bookings Gets the user's bookings. 
=======
_booking_
Get/booking Gets the available dates. {available, month, day}
POST/booking Creates a new booking with the details of said booking. {name, hour, creator, players, winners, losers}
Get/booking/bookings Gets the user's bookings.
>>>>>>> 7dbe191d75084deb69fbb0ba30f70af909d5bac9
GET/booking/:id Gets information about this booking. {name, hour, creator, players, winners}
POST/booking/:id Sends updated information of the booking. {name, creator, players, winners}
POST/booking/:id/delete-booking Deletes the whole booking.
POST/booking/addPlayer/:bookingId/:playerId Edits the booking with booking ID and adds the player with playerID to that booking
POST/booking/:id/deleteBooking/ Deletes the booking with the bookingID and updates the available hours.
POST/booking/deletePlayer/:bookingId/:playerId/ Deletes the player with the playerId from the booking with bookingId.
POST/booking/declarewinners/:id Updates the information of the winners of the match
<<<<<<< HEAD


=======
>>>>>>> 7dbe191d75084deb69fbb0ba30f70af909d5bac9

## Models

**User Model**
{
<<<<<<< HEAD
    username: String,
    email: String,
    password: String,
    description: String,
    image: { type: String, default: '/default-profile.jpg' },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    wins: { type: Number, default: 0 },
    games:{ type: Number, default: 0 },
    notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
    achievements: [{ type: Schema.Types.ObjectId, ref: 'Achievement' }]]
}


**Booking Model**
{  
    name: String,
    date: {type: Schema.Types.ObjectId, ref: 'Date'},
    hour: String,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    players:[{ type: Schema.Types.ObjectId, ref: 'User' }],
    winners: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    losers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
=======
username: String,
email: String,
password: String,
description: String,
image: { type: String, default: '/default-profile.jpg' },
bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
wins: { type: Number, default: 0 },
games:{ type: Number, default: 0 },
notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
achievements: [{ type: Schema.Types.ObjectId, ref: 'Achievement' }]]
}
**Booking Model**
{  
 name: String,
date: {type: Schema.Types.ObjectId, ref: 'Date'},
hour: String,
creator: { type: Schema.Types.ObjectId, ref: 'User' },
players:[{ type: Schema.Types.ObjectId, ref: 'User' }],
winners: [{ type: Schema.Types.ObjectId, ref: 'User' }],
losers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
>>>>>>> 7dbe191d75084deb69fbb0ba30f70af909d5bac9
}
**Notification Model**
{
<<<<<<< HEAD
    message: String,
    booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
    achievement: { type: Schema.Types.ObjectId, ref: 'Achievement' }
=======
message: String,
booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
achievement: { type: Schema.Types.ObjectId, ref: 'Achievement' }
>>>>>>> 7dbe191d75084deb69fbb0ba30f70af909d5bac9
}
**Achievement Model**
{
name: String,
description: String,
image: String,
}
**Date Model**
{
day: Number,
month: String,
available: Array,
}

**Date Model**
{
    day: Number,
    month: String,
    available: Array,
}

## Links

**GitHub_server** https://github.com/EBM90/ironpadel_server
**GitHub_client** https://github.com/paniaguaadrian/ironpadel_client
**Heroku** https://ironpadel.herokuapp.com/
**Trello** https://trello.com/b/ZfofYARC/ironpaddle
**References**
