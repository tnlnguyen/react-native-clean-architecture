import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CalendarScreen from './Components/CalendarScreen/CalendarScreen';
import InboxScreen from './Components/InboxScreen/InboxScreen';
import InsightScreen from './Components/InsightScreen/InsightScreen';
import SettingScreen from './Components/SettingScreen/SettingScreen';
import { useAppSelector } from '~Store/Hook';
import { getUser } from '~Store/Features/Auth/AuthSelector';

const Tab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  // const { params } = navigation;
  // const screenParams = navigation.params;
  const authData = useAppSelector(getUser);

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Inbox" component={InboxScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Insight" component={InsightScreen} />
        <Tab.Screen name="Settings" component={SettingScreen} />
      </Tab.Navigator>
    </>
  );
};

export default Home;
