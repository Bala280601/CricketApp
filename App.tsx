import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import Colors from './src/theme/colors';
import DataLoader from './src/components/DataLoader';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <DataLoader>
          <NavigationContainer>
            <SafeAreaView style={styles.safeArea}>
              <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
              <AppNavigator />
            </SafeAreaView>
          </NavigationContainer>
        </DataLoader>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default App;
