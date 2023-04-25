import React from 'react'
import { FlatList, Image, StyleSheet, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const images = [
    { id: '1', source: require('./imagesCarrucel/image1.jpg') },
    { id: '2', source: require('./imagesCarrucel/image2.jpg') },
    { id: '3', source: require('./imagesCarrucel/image3.jpg') },
    { id: '4', source: require('./imagesCarrucel/image4.jpg') },
  ];
export default function Carrucel() {
    
    const renderItem = ({ item }) => (
        <Image style={styles.image} source={item.source} />
      );
    
      return (
        <View style={styles.container}>
          <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width - 60}
            snapToAlignment={'center'}
            decelerationRate={'fast'}
            contentContainerStyle={{ paddingLeft: 30, paddingRight: 30 }}
          />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        height: 300,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 20,
      },
      image: {
        width: width - 90,
        height: 250,
        borderRadius: 10,
        marginHorizontal: 10,
        resizeMode: 'cover',
      },
    });
    