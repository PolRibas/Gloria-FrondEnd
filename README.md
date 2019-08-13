#Gloria - The Clubs Social Media
A small internal social network for field hockey clubs with backlog focused on other sports

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start playing into competition
-  **Login:** As a user I can login to the platform so that I can play competitions
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Add Club** As a user I can add a Club 
-  **Edit Club** As a user I can edit a the credentials of the club and delete it
-  **Add users** As a user I can add emails to the club and accept some emails that want to request to the club
-  **Edit profiles** As a user I can edit a my personal profile
-  **View Statistics Table** As a user I can see all my personal Statistics and the Statistics of the teams that i admin
-  **Edit Events** As a user I can edit the events, and create new ones

## Backlog

User profile:
- create a personal event
- create personal templates for the events

## Routes
| Path                      | Component            | Permissions | Behavior                                                         |
| ------------------------- | -------------------- | ----------- | ------------------------------------------------------------     |
| `/`                       | SplashPage           | public      | Home page                                                        |
| `/clubsignup`             | SignupPage           | anon only   | Signup form, create a new club and do all the configuration      |
| `/login`                  | LoginPage & Signup   | anon only   | Login form, signup form, navigate to feed login or signup        |
| `/logout`                 | n/a                  | anon only   | Navigate to homepage after logout, expire session                |
| `/feed`                   | feed/profile/message | user only   | Show all the feed, profile, messages and settings                |
| `/chat/:id`               | OpenChat/chatform    | user only   | Show all the messages of that room and the form for              |
| `/settings`               | settingpage          | user only   | Show the details of the setting you need to update               |
| `/statistics`             | Statistics selectform| user only   | show all the Statistics of yourself in a grup                    |
| `/events`                 | eventList            | user only   | show all event you have boked                                    |
| `/events/:id`             | eventformDone        | user only   | show your event for edit all it                                  |
| `/newEvent`               | eventform            | user only   | show your personal event form                                    |

##Node.js

###MongoD

####Models
#####User
    username (String, unique, require)
    password (String, require)
    email (String, unique)
    firstName (String)
    surName (String)
    parentOf (Array of objectIDs)
    club (Array of {
        objectID
        team: teamName(uniqueForDeClub)
        credencial
    })
    eventsDone(Array of objectIDs)

#####Events
    type (String [enum])
    team (Array of {
        objectID
        team: teamName(uniqueForDeClub)
        })
    attendees (Array of objects{
        user
        done: Boolean
    })
    data (data) - hour
    physicalDrain(number)
    personalData (Array customizable 100%)
    personalDataPlayer (Array customizable 100%)

#####Club
    name(String Unique require)
    administrators (Array)
    team (Array)

#####Chat
    id
    messages[{
        credential: String
        user: objectID
        message: String
    }]

##React

##Libraries
- formik and yup

###App-page
Routes to anonimus or public routes

###Pages
####<PublicRoute>
#####Routes

####<AnonimusRoute>
#####Routes


###Components

######<Navbar>
<NavLink> to Feed   <NavLink> to New Event   <NavLink> to Profile   <NavLink> to Events List
<NavLink> to Chat   <NavLink> to Statistics   <NavLink> to Settings -> as a special one
this NavBar will be diferent in desktop and in Phone   
Will have a active param

######<Header>
image -> Logo

#####<Cards> and <ExtendCards>
#####<EventForm> and <EventSuperForm>
#####<Statistics> and <ExtendsStatistics>
#####<Auth>
#####<ClubCreate>
#####<signup>
#####<Login>
#####<ChatCard> and <OpenChat>
#####<SearchBar>
#####<Delete>

###Context

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous

- Events Service
  - events.list()
  - events.done()
  - events.update(id)
  - events.delete(id)
  
- User Service 

  - user.detail()
  - user.add(id)
  - user.delete(id)

- Club Service 
  - club.create(data)
  - club.delite(id)
  - club.update(id)


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | /auth/profile               | Saved session                | 200            | 404          | Check if user is logged in and return user details           |
| POST        | /auth/login                 | user                         | 200            | 405          | Check if user exist and see all of this user and return user and feed|
| POST        | /auth/signup                | user                         | 200            | 406          | Check if user exist and see all of this user and return user |
| POST        | /auth/clubSignup            | user                         | 200            | 407          | Check if club exist crete it and get ready for update        |
| POST        | /auth/logout                | user                         | 200            | 408          | Check if user exist and destroy the session                  |
| GET         | /events                     | user                         | 201            | 400          | Check if user have events and return this                    |
| GET         | /doneEvents                 | user                         | 201            | 400          | Check if user have eventsDone and return this                |
| PUT         | /eventsUpdate:id            | user                         | 201            | 400          | Check if event exist and return all of this                  |
| PUT        | /profilesUpdate:id          | user                         | 201            | 400          | Check if user exist and update all of this                   |


## Links

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)–––
