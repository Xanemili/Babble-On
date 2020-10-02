# Front End

## Endpoints

|type          |route                       | description      | Functionality |
|--------------|----------------------------|------------------|---------------|
|get           |  /                         | Homepage         |
|get&post      |  /sign-up                  |Sign Up Page      |
|get&post      |  /log-in                   |
|get           |  /profiles/userId          |
|get&post      |  /profiles/userId/stories/storyId    |
|get&post      |  /profiles/userId/edit     |
|get&patch     |  /stories/postId           |
|get&post      |  /new-story                |

# Back End

## Endpoints --

|type          |route                       | description       | Functionality           |
|--------------|----------------------------|-------------------|-------------------------|
|get&post      | api/stories                | Stories Home      | retrieve stories to show|
|get&put&delete| api/stories/:id(\\d+)      | Individual Story  | Editing, viewing story as well as comments  |
|post&put      | /stories/:id(\\d+)/comment |
|get&post      | /profiles/:id(\\d+)        | user page        | viewing and editing user page|
|post          | /profiles/token              | user validation  | authentication          |
|get           | /profiles/:id(\\d+)/stories  | all of user stories| grabbing the stories belonging to user|
|get&post      | /profiles/:id(\\d+)/followers| Who user follows | viewing followers       |
