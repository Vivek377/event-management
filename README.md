
# Event Management API

An event management API for managing events, sessions, participants and speakers.


## API Reference

#### Get all events

```http
  GET /events
```



#### Create an event

```http
  POST /events/create
```

| Request Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required** |
| `location`      | `string` | **Required** |
| `date`      | `date` | **Required** |
| `sessions`      | [`objectId`] | **Not Required**. |


#### Add session to event

```http
  POST /events/add_session/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of event to add session into |

| Request Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `sessionId`      | `string` | **Required**. Id of session that needs to be added |


#### Update an event

```http
  PATCH /events/update/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of event that needs to be updated |


#### Delete an event

```http
  DELETE /events/delete/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of event that needs to be deleted |


#### Generate PDF report of an event

```http
  PATCH /events/generate_pdf/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of event to get report of |


#### Create a session

```http
  POST /sessions/create
```

| Request Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. |
| `startTime`      | `date` | **Required**. | 
| `endTime`      | `date` | **Required**. |
| `participants`      | [`objectId`] | **Not Required**. |
| `speaker`      | `objectId` | **Not Required**. |
| `event`      | `objecId` | **Not Required**. |



#### Add speaker to a session

```http
  POST /sessions/add_speaker/${id}
```

| Request Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `speakerId`      | [`objectId`] | **Required**. |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. |


#### Add participant to a session

```http
  POST /sessions/add_participant/${id}
```

| Request Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. |
| `email`      | `string` | **Required**. |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. |


#### Get all sessions

```http
  GET /sessions
```


#### Get all speakers

```http
  GET /speaker
```


#### Create a speaker

```http
  POST /speaker/create
```
| Request Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. |
| `email`      | `string` | **Required**. |
