import React from 'react'
import gql from "graphql-tag"

export const LOG_IN_USER = gql`
  mutation LOG_IN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        status
        name
        workDay{
        id
        date
      }
        email
        metadata{
          status
          userName
        }
        vehicles{
            id
            description
            price
            imageUrl
        }
        requests{
            id
            targetUser{
              id
              name
            }
        }
      }
      jwt
    }
  }
`

export const SIGN_UP_USER = gql`
  mutation SIGN_UP_USER($name: String!, $email: String!, $password: String!,$phoneNumber: String!) {
    signup(name: $name, email: $email, password: $password ,phoneNumber: $phoneNumber) {
      id
      name
      email
      phoneNumber
    }
  }
`

export const SIGN_UP_DRIVER = gql`
  mutation SIGN_UP_DRIVER($name: String!, $email: String!, $password: String! ,$status: Boolean!,$phoneNumber:String!) {
    signupDriver(name: $name, email: $email, password: $password, status: $status,phoneNumber: $phoneNumber) {
      id
      name
      email
      status
      phoneNumber
    }
  }
`

export const CREATE_REQUEST = gql`
  mutation CREATE_REQUEST(
    $id:ID!
    $vehicleId: ID!
    $country: String!
    $startDate: String!
    $stopDate: String!
    $cost: Int!
    $startLocation: String!
    $destination: String!
    $numberPeople: String!
    $locationDescription: String!
  ) {
    createRequest(
    id: $id
    vehicleId: $vehicleId 
    country:$country
    startDate:$startDate
    stopDate:$stopDate
    destination:$destination
    cost:$cost
    startLocation:$startLocation
    numberPeople:$numberPeople
    locationDescription:$locationDescription
    ) {
    id
    country
    startDate
    stopDate
    startLocation
    destination
    numberPeople
    locationDescription
    cost
    targetVehicle{
      id
      description
    }
    user{
      id
      name
    }
    targetUser{
      id
      name
    }
  }
  }
`

export const CREATE_VEHICLE = gql`
  mutation CREATE_VEHICLE(
    $description: String!
    $additional: [String]!
    $country: String!
    $imageUrl: [String]!
    $regBook:String!
    $regBookIm:String!
    $price: Float!
    $numberPeople: String!
    $foodDrink: Boolean!
    $tv: Boolean!
    $karaoke: Boolean!
    $gps: Boolean!
  ) {
    createVehicle(
      description: $description
      additional:$additional
      country: $country
      imageUrl: $imageUrl
      regBook: $regBook
      regBookIm: $regBookIm
      price: $price
      numberPeople:$numberPeople
      foodDrink:$foodDrink
      tv:$tv
      karaoke:$karaoke
      gps:$gps
    ) {
      id
      description
      additional
      country
      price
      imageUrl
      regBook
      regBookIm
      numberPeople
      foodDrink
      tv
      karaoke
      gps
    }
  }
`

export const UPDATE_VEHICLE = gql`
  mutation UPDATE_VEHICLE(
    $id: ID!
    $description: String
    $imageUrl: String
    $regBook:String
    $regBookIm:String
    $price: Float
    $numberPeople: String
    $foodDrink: String
  ) {
    updateVehicle(
      id: $id
      description: $description
      imageUrl: $imageUrl
      regBook: $regbook
      regBookIm: $regbookIm
      price: $price
      numberPeople:$numberPeople
      foodDrink:$foodDrink
    ) {
        id
      description
      regBook
      regBookIm
      country
      price
      imageUrl
      numberPeople
      foodDrink
    }
  }
`

export const CREATE_METADATA = gql`
  mutation CREATE_METADATA(
    $gender: String!
    $userName: String!
    $dateOfBirth: String!
    $image: String!
    $idCard: String!
    $driverlicense: String!
    $idCardIm: String!
    $driverlicenseIm: String!
  ) {
    createDriverMetadata(
    gender: $gender
    userName: $userName
    dateOfBirth: $dateOfBirth
    image: $image
    idCard: $idCard
    driverlicense: $driverlicense
    idCardIm: $idCardIm
    driverlicenseIm: $driverlicenseIm
    ) {
    gender
    userName
    dateOfBirth
    image
    idCard
    driverlicense
    idCardIm
    driverlicenseIm
    status
    user{
        id
        name
        metadata{
          status
        }
    }
    }
  }
`

export const DELETE_VEHICLE = gql`
  mutation DELETE_VEHICLE($id: ID!) {
    deleteVehicle(id: $id) {
      id
    }
  }
`

export const UPDATE_REQUEST = gql`
  mutation UPDATE_REQUEST(
    $id: ID!
    $status: String!
  ) {
    updateRequest(
    id: $id
    status:$status
    ) {
      id
    status
    }
  }
`

export const CREATE_WORKDAY = gql`
  mutation CREATE_WORKDAY(
    $date: String!
  ) {
    createWorkDay(
    date:$date
    ) {
    id
    date
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation CREATE_REVIEW(
    $id: ID!
    $vehicleId: ID!
    $star: Int!
    $review: String!
    $starVehicle: Int!
    $reviewVehicle: String!
  ) {
    createReview(
    id:$id
    vehicleId: $vehicleId
    star:$star
    review:$review 
    starVehicle:$starVehicle
    reviewVehicle:$reviewVehicle 
    ) {
    id
    user{
      id
      name
    }
    vehicle{
      id
      description
    }
    star
    starVehicle
    review
    reviewVehicle
    }
  }
`