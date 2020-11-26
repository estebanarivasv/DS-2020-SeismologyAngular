# :earth_americas: Seismology Proyect

Subject: "Diseño de sistemas"
<br><br>
This is a mirrored repository of the project I did for "Programación I" (Programming) at Universidad de Mendoza. For more information, go to https://github.com/estebanarivasv/Seismology-Flask

The aim of this repository is emphasize software design patterns and best software practices.
<br><br>

# :pencil: Description
The aim of this project is simulating a Seismology Institute center where the main actors of the system are seisms, seismologists and the sensors.
<br><br>
@andrea.navarro, my teacher, came up with this idea. She learnt us how do the main system structure works and our job was adapt the project to the requirements.
<br><br>
The project incluides the following items:
- Make requests to sensos.
- Save/modify seisms data (basic CRUD methods) with HTTP requests
- Send emails to administrators of sensors that are not working
- Web and api integration

# :deciduous_tree: Project's tree structure diagram

Given the task, I've designed my project structure with the Model–view–controller (MVC) software design pattern.

### REST Api on Flask
```
.
├── app.py                                                  -- App instance
├── database                                                -- SQLite db 
│   └── data.db
├── insomnia_requests.json
├── main
│   ├── __init__.py
│   ├── controllers                                         -- HTTP Requests jsons handling
│   │   ├── __init__.py
│   │   ├── seism.py
│   │   ├── sensor.py
│   │   └── user.py
│   ├── extensions                                          -- Main components initialization
│   │   ├── __init__.py
│   ├── mapping                                             -- JSON dictionaries mapping for db
│   │   ├── __init__.py
│   │   ├── seism.py
│   │   ├── sensor.py
│   │   └── user.py
│   ├── models                                              -- Database models
│   │   ├── __init__.py
│   │   ├── seism.py
│   │   ├── sensor.py
│   │   └── user.py
│   ├── repositories                                        -- CRUD Methods for the controllers interacting with the db
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── seism.py
│   │   ├── sensor.py
│   │   └── user.py
│   ├── resources
│   │   ├── authentication
│   │   │   ├── decorators.py                               -- Controllers restriction
│   │   │   └── routes.py                                   -- Auth routes
│   │   ├── functions.py                                    -- get_near_seisms() - Pandas
│   │   ├── __init__.py
│   │   ├── pagination.py                                   -- Model used in repositories
│   │   └── validators.py                                   -- Objects validation used in repositories
│   ├── services
│   │   ├── __init__.py
│   │   ├── jobs
│   │   │   ├── functions.py                                -- get_seisms_from_api(), get_ids_to_delete()
│   │   │   ├── __init__.py
│   │   │   └── tasks.py                                    -- seisms_achiever, data_persistance
│   │   └── mail_sending                                    -- Email admins of not working sensors
│   │       ├── controller.py
│   │       └── resources.py
│   └── templates                                           -- Email templates
│       └── mail
│           ├── sensors_status.html
│           └── sensors_status.txt
└── requirements.txt
```

### Web client on Angular
```
.
├── app
│   ├── app.component.html                                  -- ROUTER IMPLEMENTATION, Bootstrap CDN
│   ├── app.constants.ts                                    -- API URL
│   ├── app.module.ts                                       -- Dependencies, Bootstrap CDN
│   ├── app-routing.module.ts                               -- ROUTING, Bootstrap CDN
│   ├── app-sorting.directive.ts
│   ├── alerts                                              
│   │   ├── alerts.service.ts
│   ├── authentication                                      
│   │   ├── authentication.component.html                   -- Login template
│   │   ├── authentication.component.ts
│   │   ├── authentication.service.ts                       -- Api authentication interaction
│   │   ├── guards                                          -- Limit routing
│   │   └── interceptors
│   ├── guards
│   ├── header
│   │   └── header.component.html
│   ├── home
│   │   └── home.component.html
│   ├── pagination.model.ts
│   ├── seisms
│   │   ├── seisms-filter.model.ts                          -- Seisms pagination, sorting and filter model
│   │   ├── seisms.model.ts                                 -- Seisms model for requests mapping
│   │   ├── seisms.service.ts                               -- Seisms components interaction with HTTP requests
│   │   ├── unverified-seisms
│   │   │   ├── edit-unverified
│   │   │   ├── unverified-seisms.component.html
│   │   │   ├── unverified-seisms.component.ts
│   │   │   └── view-unverified
│   │   └── verified-seisms
│   │       ├── verified-seisms.component.html
│   │       ├── verified-seisms.component.ts
│   │       └── view-verified
│   ├── sensors
│   │   ├── add-sensor
│   │   ├── check-sensor
│   │   ├── delete-sensor
│   │   ├── edit-sensor
│   │   ├── sensors.component.html
│   │   ├── sensors.component.ts
│   │   ├── sensors-filter.model.ts                         -- Sensors pagination, sorting and filter model
│   │   ├── sensors.model.ts                                -- Sensors model for requests mapping
│   │   ├── sensors.service.ts                              -- Sensors component interaction with HTTP requests
│   │   └── view-sensor
│   ├── upper-body                                          -- BREADCRUMBS, TITLE
│   │   ├── upper-body.component.html
│   │   ├── upper-body.component.ts
│   │   └── upper-body.interfaces.ts
│   └── users
│       ├── add-user
│       ├── delete-user
│       ├── edit-user
│       ├── users.component.html
│       ├── users.component.ts
│       ├── users.model.ts                                  -- Users model for requests mapping
│       └── users.service.ts                                -- Users component interaction with HTTP requests
├── assets
│   ├── img
│   └── videos
├── environments
├── favicon.ico
├── index.html
├── main.ts
├── polyfills.ts
├── styles.scss
└── test.ts
```
# Software design patterns applied in the project 


# :computer: Developing stages

At the beginning, I had the REST Api from the base repository from where I started. Here it is the full description of what I did:

### Backend
#### 1 - Mapping 
DB Models Schemas creation (flask-marshmallow). to_json(), from_json() deletion.
#### 2 - Controllers and repositories 
Modularity.   Controllers -> HTTP Requests
#### 3 - Filtering, sorting and pagination 
General Pagination class
#### 4 - Repositories
Modularity.   Repositories -> DB interaction
#### 5 - Resources
Modularity.   Reorganizing: auth, various functions for services, validators, pagination
#### 6 - Services
Jobs: data persistance, data obtention

### Frontend
#### 1 - Components 
Views design: home, seisms, sensors, users
#### 2 - Services 
HTTP Requests
#### 3 - Forms and validations 
Reactive forms on add and edit views
#### 4 - Alerts
Service that displays alerts
#### 5 - Filtering, sorting, pagination
Template-driven forms. Filter models, NgbdSortableHeader, ngb-pagination
#### 6 - Auth
Auth service, HttpRequestsInterceptor, Guard

#### What's left to do?
- CSV download
- Email sending integration
- Near seisms from input location
- Api validation
- Guards

# Problems
- New framework, new languaje
- Time

# :information_source: Installation and usage for both API and Web client
Steps to follow in order to get the Flask app and Angular client up and running

#### 1 - Define the environment variables in .env and app.constants.ts files
You can rename the .env-example file to .env

:exclamation: Remember you need to declare all the variables including the database path. 

#### 2 - Install dependencies
To begin the instalation of libraries and the frameworks needed: `./install.sh` and `npm install`

#### 3 - Launch Flask application
To get the app running: `./boot.sh` and `ng serve`

##### 3.1 - Import requests file for the api in Insomnia
