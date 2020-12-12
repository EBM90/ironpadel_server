# IronPadel

![IronPadel](<img src="/ironpadel_azul claro.png">)
<img src="/ironpadel_azul claro.png">

## Description

Due to external reasons, IronHack has been forced to restrict entrance to the rooftop area. Because of this,
they have decided to build a paddle court. IronHackers will be able to book games through IronPadel and find
other IronHackers to play with, as well as earn achievements and checkout their statistics and others'.

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
**Five connected models** - User, Booking, Date, Notification and Achievement 
**Three types of players** - Creator, Participant, Viewer
**Add new players**
**Responsive**

## Backlog

**Private and Public bookings**
**Close a booking**
**Achievements** - Mora badges
**Statistics** - More statistics
**In-game chat** 
**Challenge other users**
**mini e-commerce**
**notifications for achievements**

## Tech challenge

**MERRRRRRRRN**
**Scheduling a booking**


## Structure

ironpadel-backend/

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
            ├── home.js
            ├── auth.js
            ├── community.js
            └── private
                ├── user.js
                └── booking.js

**Frontend structure to added in the near future**

## Routes

**public**
_auth_
POST/auth/login Sends Login form data to the server.{ username, password }
POST/auth/signup Sends SignUp info to the server and creates user in the DB.{ username, email, password }
POST/auth/logout Destroys user's session
GET /auth/me Gets the information of the user currently logged in

_home_
Get/home/main Gets the information of the loggedIn user.
POST/delete-notification/:id Deletes the notification. {username, email, description, image, bookings, wins, notifications, achievements}

_community_
Get/community Gets the information of all the bookings. {name, hour, creator, players, winners, losers}


**private**
_user_
GET/profile Gets information of the current user. {username, email, description, image, bookings, wins, notifications, achievements}
GET/profile/:id Gets the information of the user. {username, email, description, image, achievements}
POST/profile/:id Sends updated information of the user. {username, email, description, image}
POST/profile/uploadpicture Sends updated information of the image the user has sent to uploaded.


_booking_
Get/booking Gets the available dates. {available, month, day}
POST/booking Creates a new booking with the details of said booking. {name, hour, creator, players, winners, losers}
Get/booking/bookings Gets the user's bookings. 
GET/booking/:id Gets information about this booking. {name, hour, creator, players, winners}
POST/booking/:id Sends updated information of the booking. {name, creator, players, winners}
POST/booking/:id/delete-booking Deletes the whole booking.
POST/booking/addPlayer/:bookingId/:playerId Edits the booking with booking ID and adds the player with playerID to that booking
POST/booking/:id/deleteBooking/ Deletes the booking with the bookingID and updates the available hours.
POST/booking/deletePlayer/:bookingId/:playerId/ Deletes the player with the playerId from the booking with bookingId.
POST/booking/declarewinners/:id Updates the information of the winners of the match



## Models

**User Model**
{
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
}
**Notification Model**
{
    message: String,
    booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
    achievement: { type: Schema.Types.ObjectId, ref: 'Achievement' }
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
