// Main component to load fonts and check authorization
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { stateChangeUser } from "../../redux/auth/authOperations";
import { selectIsAuth } from "../../redux/auth/authSelectors";
import useRouter from "../../router";

export default function Main() {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stateChangeUser());
  }, []);

  const routing = useRouter(isAuth);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded || isAuth === null) {
    return null;
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}
