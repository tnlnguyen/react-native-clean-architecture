import 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store, { persistor } from '~Store/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '~Base/Navigation/Navigation';

import LanguageProvider from '~Base/LanguageProvider/LanguageProvider';
import { translationMessages } from '~i18n';
import { SCREEN } from '~Core/Utils/Screens';

import Home from '~Containers/Home/Home';
import Login from '~Containers/Login/Login';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LanguageProvider messages={translationMessages}>
          <SafeAreaProvider>
            <View style={styles.box}>
              <NavigationContainer ref={navigationRef}>
                <Stack.Navigator initialRouteName={SCREEN.LOGIN}>
                  <Stack.Screen name={SCREEN.LOGIN} component={Login} />
                  <Stack.Screen name={SCREEN.HOME} component={Home} />
                </Stack.Navigator>
              </NavigationContainer>
            </View>
          </SafeAreaProvider>
        </LanguageProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    flex: 1,
  },
});
