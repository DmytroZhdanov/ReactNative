import { useRoute } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  const { coords } = useRoute().params;

  const handleDragEnd = e => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    // Temporary. Will be changes after connecting db
    console.log(`Changes image coordinates to lat: ${latitude} long: ${longitude}`);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{ ...coords, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        showsUserLocation={true}
      >
        <Marker coordinate={coords} draggable onDragEnd={handleDragEnd}></Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
