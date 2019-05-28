import Reac from 'react';
import {Platform} from 'react-native';

import {createStackNavigator, createDrawerNavigator} from 'react-navigation';

import AddKhel from '../Components/MainApp/AddKhel'
import KhelDetails from '../Components/MainApp/KhelDetails'
import KhelList from '../Components/MainApp/KhelList'
import Profile from '../Components/MainApp/Profile'
import drawerContentComponents from '../Components/drawerContentComponents'
import PendingList from '../Components/MainApp/Admin/PendingList'
import ApproveKhel from '../Components/MainApp/Admin/ApproveKhel'

const khelListStack = createStackNavigator({
    KhelList : KhelList    
});

const KhelDetailsStack = createStackNavigator({
    KhelDetails : KhelDetails    
});

const AddKhelStack = createStackNavigator({
    AddKhel : AddKhel    
});

const ProfileStack = createStackNavigator({
    Profile : Profile    
});

const AdminHomeStack = createStackNavigator({
    PendingList : PendingList,
    ApproveKhel : ApproveKhel
});

const MainStack = createStackNavigator({
    Khel : khelListStack,
    KhelDetails : KhelDetailsStack,
    AddKhel : AddKhelStack    
}, {
    headerMode: "none"    
});

export default createDrawerNavigator({
    Home : MainStack,
    Profile: ProfileStack,
    AdminHome : AdminHomeStack
},{
    contentComponent: drawerContentComponents,
    
 })

/*

export default createStackNavigator({

    Khel : khelListStack,
    KhelDetails : KhelDetailsStack,
    AddKhel : AddKhelStack,
    Profile: ProfileStack
})
*/