import React from 'react'
import gql from "graphql-tag"

export const ME = gql`
  query ME {
    user{
    id
    name
    workDay{
        id
        date
      }
      review{
        star
        review
        starVehicle
        reviewVehicle
        vehicle{
          id
        }
      }
    vehicles{
      id
      description
      price
      additional
      imageUrl
      numberPeople
      foodDrink
      karaoke
      tv
      gps
    }
    requests{
      id
    country
    numberPeople
    startDate
    stopDate
    startLocation
    locationDescription
    status
    cost
    targetVehicle{
      id
      description
      additional
      numberPeople
      foodDrink
      karaoke
      tv
      gps
      country
      price
      imageUrl
    }
      targetUser{
        id
        name
        metadata{
          image
          userName
        }
      }
      user{
        id
        name
      }
  }
  metadata{
    userName
    dateOfBirth
    gender
    idCard
    image
    driverlicense
    idCardIm
    driverlicenseIm
    status
    user{
      email
      id
      name
      }
    }
  }
  }
`

export const ALLUSER = gql`
  query ALLUSER {
    allUser{
    id
    name
    workDay{
        id
        date
      }
    vehicles{
      id
      description
      additional
      price
      imageUrl
      numberPeople
      foodDrink
      karaoke
      tv
      gps
    }
    requests{
      id
    country
    numberPeople
    startDate
    stopDate
    startLocation
    locationDescription
    status
    cost
      targetUser{
        id
        name
      }
      user{
        id
        name
      }
  }
  metadata{
    gender
    # age
    idCard
    image
    driverlicense
    idCardIm
    driverlicenseIm
    status
    user{
      email
      id
      name
      }
    }
  }
  }
`

export const QUERY_ALLVEHICLE = gql`
  query QUERY_ALLVEHICLE {
    allVehicle{
    id
    description
    additional
    numberPeople
    foodDrink
    karaoke
    tv
    gps
    country
    price
    imageUrl
    user{
      id
      name
      workDay{
        id
        date
      }
      metadata{
        status
        gender
        dateOfBirth
        userName
      }
      review{
        star
        starVehicle
        review
        reviewVehicle
        vehicle{
          id
        }
      }
    }
  }
  }
`
export const QUERY_ALLMETADATA = gql`
  query QUERY_ALLMETADATA {
    allMetadata{
    gender
    userName
    dateOfBirth
    idCard
    driverlicense
    idCardIm
    driverlicenseIm
    image
    status
    user{
      id
      name
    }
  }
  }
`