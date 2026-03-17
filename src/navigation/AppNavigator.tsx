import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import AuctionScreen from '../screens/AuctionScreen';
import PlayersScreen from '../screens/PlayersScreen';
import TeamsScreen from '../screens/TeamsScreen';
import LeagueScreen from '../screens/LeagueScreen';
import AddPlayerScreen from '../screens/AddPlayerScreen';
import Colors from '../theme/colors';

const Tab = createBottomTabNavigator();

const tabIcon = (label: string, focused: boolean) => {
  const icons: Record<string, string> = {
    Home: '🏠',
    League: '🏏',
    Auction: '🔨',
    Players: '🏃',
    Teams: '🏟️',
    Draft: '📝',
  };
  return <Text style={{ fontSize: focused ? 22 : 18 }}>{icons[label]}</Text>;
};

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => tabIcon(route.name, focused),
        tabBarLabel: route.name,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="League" component={LeagueScreen} />
      <Tab.Screen name="Auction" component={AuctionScreen} />
      <Tab.Screen name="Players" component={PlayersScreen} />
      <Tab.Screen name="Teams" component={TeamsScreen} />
      <Tab.Screen name="Draft" component={AddPlayerScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
