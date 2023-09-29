// Component to render MapScreen
import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  const { coords } = useRoute().params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{ ...coords, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        showsUserLocation={true}
      >
        <Marker coordinate={coords}></Marker>
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
