import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  currency: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 18,
    color: '#555',
  },
});

const BitcoinList = ({ bitcoinData }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(bitcoinData.bpi || {})}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.currency}>{item}</Text>
            <Text style={styles.price}>{bitcoinData.bpi[item].rate}</Text>
          </View>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default BitcoinList;
