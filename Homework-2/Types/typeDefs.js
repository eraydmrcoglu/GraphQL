const { gql } = require('apollo-server')
const { nanoid } = require('nanoid')

const typeDefs = gql`
    #Event
    type Event{
        id:ID!
        title:String!
        desc:String!
        date:String!
        from:String!
        to:String!
        location_id:ID!
        user_id:ID!
        user:User!
        location:Location!
        participants:[Participant!]!
    }
   
    input CreateEvent{
        title:String!
        desc:String!
        date:String!
        from:String!
        to:String!
        location_id:ID!
        user_id:ID!
    }
    input updateEvent{
        title:String!
        desc:String!
        date:String!
        from:String!
        to:String!
        location_id:ID!
        user_id:ID!
    }
    #Location
    type Location{
        id:ID!
        name:String!
        desc:String!
        lat:Float!
        lng:Float!
    }
    input CreateLocation{
        name:String!
        desc:String!
        lat:Float!
        lng:Float!
    }
    input UpdateLocation{
        name:String!
        desc:String!
        lat:Float!
        lng:Float!
    }
    # User
    type User{
        id:ID!
        username:String!
        email:String!
        event:[Event!]!
    }
    input CreateUser{
        username:String!
        email:String!
    }
    input UpdateUser{
        username:String!
        email:String!
    }
    type DeleteAllOutput{
        count:Int!
    }
   
    #Participant
    type Participant{
        id:ID!
        user_id:ID!
        event_id:ID!
        users:[User!]!
    }
    input CreateParticipant{
        user_id:ID!
        event_id:ID!
    }
    input UpdateParticipant{
        user_id:ID!
        event_id:ID!
    }
    type Query{
        ## Event Queries
        events:[Event!]!
        event(id:ID!):Event!
        
        ## Location Queries
        locations:[Location!]!
        location(id:ID!):Location!
        
        ## User Queries
        users:[User!]!
        user(id:ID!): User!
        
        ## Participant Queries
        participants:[Participant!]!
        participant(id:ID!): Participant!
    }
    
    type Mutation{
        ## User Mutation
        createUser(data: CreateUser!):User!
        updateUser(id:ID!, data:UpdateUser):User!
        deleteUser(id:ID!):User!
        deleteAllUsers:DeleteAllOutput!
        
        ## Event Mutation
        createEvent(data:CreateEvent!):Event!
        updateEvent(id:ID!, data:updateEvent):Event!
        deleteEvent(id:ID!):Event!
        deleteAllEvents:DeleteAllOutput!
        
        ## Location Mutation
        createLocation(data:CreateLocation!):Location!
        updateLocation(id:ID!, data:UpdateLocation!):Location!
        deleteLocation(id:ID!):Location!
        deleteAllLocations:DeleteAllOutput!
        
        ## Participant Mutation
        createParticipat(data:CreateParticipant):Participant!
        updateParticipant(id:ID!, data:UpdateParticipant):Participant!
        deleteParticipant(id:ID!):Participant!
        deleteAllParticipants:DeleteAllOutput!
    }
   
   type Subscription{
       userCreated:User!
       eventCreated:Event!
   }
`

module.exports = { typeDefs }