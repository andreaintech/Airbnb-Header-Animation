import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Image,
  StatusBar,
  Text
} from 'react-native';
import Animated from "react-native-reanimated";

const images = Array.from({ length: 30 }, (x, index) => ({ id: index }))
console.log('imagess: ', images)
const STATUS_BAR = StatusBar.currentHeight || 24;
const HEADER_HEIGHT = Platform.OS == 'ios' ? 115 : 40 + STATUS_BAR;

const getImage = (i: number) => `https://source.unsplash.com/600x${600 + i}/?beach`;

const App = () => {
  const scrollY = new Animated.Value(0);
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
  const headerY = Animated.interpolateNode(diffClampScrollY, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT]
  })

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: HEADER_HEIGHT,
          backgroundColor: 'rgba(70, 70, 94, 0.15)',
          zIndex: 1000,
          elevation: 1000,
          transform: [{ translateY: headerY }],
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 45,
        }}
      >
        <Text style={styles.headerText}>Animated Header</Text>
      </Animated.View>

      <Animated.ScrollView
        bounces={false} // Just for iOS
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}
        style={styles.animatedScrollView}
      >
        {images.map((image, index) => (
          <View
            key={image.id}
            style={{ height: 400, margin: 20 }}
          >
            <Image style={styles.image} source={{ uri: getImage(index) }} />
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedScrollView: { paddingTop: HEADER_HEIGHT },
  headerText: { color: 'white', fontSize: 20, },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    borderRadius: 10,
  }
});

export default App;
