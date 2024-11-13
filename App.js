import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Home from './screens/Home';
import RoundTrip from './screens/RoundTrip';
import OneWay from './screens/OneWay';
import MultiCity from './screens/MultiCity';
import SelectDepartureCity from './screens/SelectDepartureCity';
import FlightResults from './screens/FlightResults';
import Payment from './screens/Payment';
import SeatSelectionScreen from './screens/SeatSelectionScreen';
import Seat from './screens/Seat';
import Baggage from './screens/Baggage';
import TravellerInformation from './screens/TravellerInformation';
import FlightDetails from './screens/FlightDetails';
import SortAndFilterModal from './screens/SortAndFilterModal';
import SelectFlight from './screens/SelectFlight';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SelectFlight' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SelectFlight" component={SelectFlight} />
        <Stack.Screen name="SortAndFilterModal" component={SortAndFilterModal} />
        <Stack.Screen name="FlightDetails" component={FlightDetails} />
        <Stack.Screen name="TravellerInformation" component={TravellerInformation} />
        <Stack.Screen name="Baggage" component={Baggage} />
        <Stack.Screen name="Seat" component={Seat} />
        <Stack.Screen name="SeatSelectionScreen" component={SeatSelectionScreen} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="FlightResults" component={FlightResults} />
        <Stack.Screen name="RoundTrip" component={RoundTrip} />
        <Stack.Screen name="SelectDepartureCity" component={SelectDepartureCity} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="OneWay" component={OneWay} />
        <Stack.Screen name="MultiCity" component={MultiCity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}