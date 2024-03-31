// useBitcoinData.js
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const useBitcoinData = () => {
  const [bitcoinData, setBitcoinData] = useState({});

  useEffect(() => {
    const fetchDataAndSaveToDB = async () => {
      try {
        const storedData = await getDataFromDB();
        if (storedData) {
          console.log('Data fetched from local DB:', storedData);
          setBitcoinData(storedData);
        }
        console.log('Fetching fresh data from API');
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        const data = response.data;
        console.log('Data fetched from API:', data);
        setBitcoinData(data);
        await saveDataToDB(data);
        console.log('Data saved to local DB:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const timer = setInterval(() => {
      console.log('Timer triggered');
      fetchDataAndSaveToDB();
    }, 60000); // Fetch data every minute
  
    fetchDataAndSaveToDB(); // Fetch data immediately on component mount
  
    return () => {
      console.log('Clearing timer');
      clearInterval(timer); // Cleanup function to clear the timer
    };
  }, []);  

  const saveDataToDB = async (data) => {
    try {
      await AsyncStorage.setItem('bitcoinData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to local DB:', error);
    }
  };

  const getDataFromDB = async () => {
    try {
      const storedData = await AsyncStorage.getItem('bitcoinData');
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error('Error fetching data from local DB:', error);
      return null;
    }
  };

  return bitcoinData;
};

export default useBitcoinData;
