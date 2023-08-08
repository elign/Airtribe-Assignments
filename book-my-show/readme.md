## Problem Statement Understanding

1. Select City
> o/p -> Gives the list of all theatres in the city
2. Select theatre in the city
> o/p -> Dates of next 7 days.
3. Selects the date,
> o/p -> List of all movies in the theatre on the selected date.
Movies should contain the following details:
a. All the showtimes,
b. Features like 4K ATMOS, etc.

## Assumptions
1. User login, signup, authentication and authorization mechanism is setup.
2. Avoiding to show information like available seats etc, to avoid the additional complexity.

## User Flow

0. User lands on the app.
1. Selects the city,
> **Client App's Action**: [calls api to fetch all the theatres in the city.]

> **Response from API** : [sends the list of all theatres in json format.]
2. Selects the theatre, and date, and clicks search.
> **Client App's Action**: [calls api to fetch list of all shows, in a theatre on the given date.]

> **Response from API** : [A json file, with name of movies as keys which contains movie info and the array of shows of that movie, where the info in each array item is {date, features, language}].

## What's to be done?

1. Design the Models for all the Database tables.
2. Desing three APIs as follows.

```
GET /cities           (Get a list of all cities)
GET /cities/:city/theatres (Get all theatres in a specific city)
GET /theatres/:theatre/:date (Get all shows on a specific date in a specific theatre with the given id).

```


## Database Schema

1. **Table: Cities** (A user can choose a city in which he wants to book a ticket, for example.)

   | City ID | City Name   |
   |---------|-------------|
   | 101     | Jaipur      |
   | 102     | Delhi       |
   | 103     | Mumbai      |
   | 104     | Bangalore   |
   | ...     | ...         |


2. **Table: Theatres**
(One city can have multiple theatres. Each theatre will be identified by its unique id.)

   | Theatre ID | Theatre Name | City ID |
   |------------|--------------|---------|
   | 201        | Theatre A    | 101     |
   | 202        | Theatre B    | 101     |
   | 203        | Theatre C    | 102     |
   | 204        | Theatre D    | 102     |
   | ...        | ...          | ...     |

3. **Table: Movies**
   | Movie ID | Movie Name       | Language  |Dimension  |
   |----------|------------------|-----------|-----------|
   | 301      | Movie X          | 601       |2D         |
   | 302      | Movie Y          | 602       |3D         |
   | 303      | Movie Z          | 602       |2D         |
   | ...      | ...              | ...       |...        |

4. **Table: Shows** (A theatre can have multiple movies running at different time slots, so one theatre can have multiple shows.)

> Note: Show time and show date are two seperate columns in the data given below. This is just a combined representation for better understanding.

   | Show ID | Movie ID | Theatre ID | Show Time          | Show Language| Feature ID|
   |---------|----------|------------|--------------------|--------------|---- |
   | 401     | 301      | 201        | 2023-08-01 9AM     | 601          | 501 |
   | 402     | 301      | 201        | 2023-08-01 12PM    | 601          | 501 |
   | 403     | 301      | 202        | 2023-08-01 9AM     | 602          | 501 |
   | 404     | 302      | 203        | 2023-08-02 10AM    | 603          | 501 |
   | ...     | ...      | ...        | ...                | ...          | ... |

5. **Table: Show Features**
   | Feature ID | Feature       |
   |------------|---------------|
   | 501        | 4K Atmos      |
   | 502        | Dolby Atmos   |
   | 503        | Playhouse 4K  |
   | 504        | Dolby Atmos   |

6. **Table: Language** 
   | Language ID | Language
   |------------|---------|
   | 601        | English |
   | 602        | Hindi   |
   | 603        | Tamil   |
   | 604        | Telugu  |
   | ...        | ...     |



> NOTE : This schema ignores the complexity of storing seat data for each show to avoid the complexity. Otherwise, I will start designing a Book My Show Competitor which is not in the scope of this project.

## Entity Relationships

Here's the data in the form of a table, representing the relationships and their descriptions:

| Entity One      | Entity Two      | Relationship Type     | Description                                                                   |
|-----------------|-----------------|-----------------------|-------------------------------------------------------------------------------|
| Cities          | Theatres        | One-to-Many           | One city can have multiple theatres, but each theatre belongs to only one city.|
| Theatres        | Movies          | Many-to-Many          | One theatre can have multiple movies running, and one movie can run in multiple theatres. |
| Shows           | Movies          | Many-to-One           | Many shows belong to one movie, but one movie can have multiple shows.        |
| Shows           | Theatres        | Many-to-One           | Many shows belong to one theatre, but one theatre can have multiple shows.    |
| Shows           | Show Features   | Many-to-Many          | One show can have multiple features, and one feature can be associated with multiple shows. |
| Bookings        | Shows           | Many-to-One           | Many bookings can belong to one show, but one show can have multiple bookings. |

## Redis
If I've to cache the data in Redis then I'll cache the 7 days of complete shows data. This will help us fetch the requested data easily.