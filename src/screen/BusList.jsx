import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Bus from '../components/Bus'

export default function BusList() {
  const busData = [
    {
      busId : 'b1',
      departureTime : '21:25',
      destinationTime : '03:15',
      price : '400',
      journeyTime : '5h 50m',
      seatAvailability : '20',
      travelAgencyName : 'Jay Dwarkesh Travels',
      busType : 'NON A/C Sleeper',
      rating : '3.9',
    },
    {
      busId : 'b2',
      departureTime : '23:15',
      destinationTime : '04:30',
      price : '450',
      journeyTime : '5h 15m',
      seatAvailability : '18',
      travelAgencyName : 'Tulsi Travels',
      busType : 'AC Sleeper',
      rating :'3.2', 
    },
    {
      busId : 'b3',
      departureTime : '22:20',
      destinationTime : '04:05',
      price : '450',
      journeyTime : '5h 45m',
      seatAvailability : '20',
      travelAgencyName : 'Samay Travels',
      busType : 'NON A/C Sleeper',
      rating :'3.1', 
    },
    {
      busId : 'b4',
      departureTime : '21:50',
      destinationTime : '02:50',
      price : '749',
      journeyTime : '5h 00m',
      seatAvailability : '21',
      travelAgencyName : 'Samay Travels',
      busType : 'A/C Sleeper (2+1)',
      rating :'3.5', 
    },
    {
      busId : 'b5',
      departureTime : '22:45',
      destinationTime : '04:00',
      price : '450',
      journeyTime : '5h 15m',
      seatAvailability : '36',
      travelAgencyName : 'Tulsi Travels',
      busType : 'NON A/C Sleeper',
      rating :'2.4', 
    },
    {
      busId : 'b6',
      departureTime : '21:45',
      destinationTime : '02:00',
      price : '450',
      journeyTime : '4h 15m',
      seatAvailability : '36',
      travelAgencyName : 'MatruKrupa Travels',
      busType : 'NON A/C Sleeper',
      rating :'2.7', 
    },
  ];
  return (
  <FlatList
    data={busData}
    renderItem={({item}) => <Bus data={item}/>}
    keyExtractor={(item) => item.busId}
  />
  )
}