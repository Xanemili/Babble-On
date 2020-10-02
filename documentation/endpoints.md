# Front End

## Endpoints

|type          |route                       | description      | Functionality |
|--------------|----------------------------|------------------|---------------|
|get           |  /                         | Homepage         |
|get&post      |  /sign-up                  |Sign Up Page      |
|get           |  /log-in                   |
|get           |  /profiles/userId          |
|get&post      |  /profiles/userId/story    |
|get&post      |  /profiles/userId/edit     |
|get&patch     |  /stories/postId           |
|get&post      |  /new-story                |

# Back End

## Endpoints

|type          |route                       | description       | Functionality           |
|--------------|----------------------------|-------------------|-------------------------|
|get&post      | /stories                   | Stories Home      | retrieve stories to show|
|get&put&delete| /stories/:id(\\d+)         | Individual Story  | Editing, viewing story as well as comments  |
|*post&put*      | */stories/:id(\\d+)/comment*|
|get&post      | /profile                    | user page        | viewing and editing user page|
|post          | /profile/token              | user validation  | authentication          |
|get           | /profile/:id(\\d+)/stories  | all of user stories| grabbing the stories belonging to user|
|get&post      | /profile/:id(\\d+)/following| Who user follows | viewing followers       |
