import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MyHeader from '../components/MyHeader';
import db from '../config';
import { ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

export default class Home extends React.Component{
  constructor(){
    super();
    this.state={
      requestedItemsList: []
    }

    this.requestRef = null;
  }

  getRequestedItemsList=()=>{
    this.requestRef = db.collection("requested_items")
    .onSnapshot((snapshot)=>{
      var requestedItemsList = snapshot.docs.map(document=>document.data())
      this.setState({requestedItemsList: requestedItemsList})
    })
  }

  componentDidMount(){
    this.getRequestedItemsList();
  }

  componentWillMount(){
    this.requestRef;
  }

  keyExtractor=(item, index)=>index.toString()

  renderItem=({item, i})=>{
    return(
      <ListItem
      key={i}
      title={item.item_name}
      subtitle={item.reason_to_request}
      titleStyle={{color: 'black', fontWeight: 'bold'}}
      rightElement={
      <TouchableOpacity style={styles.button}
      onPress ={()=>{this.props.navigation.navigate("RecieverDetails", {"details": item})}}>
        <Text style={{color: '#ffffff', fontWeight: '600', fontSize: 16}}>View</Text>
      </TouchableOpacity>}
      bottomDivider />
    )
  }
  
  render(){
    return(
      <View style={{height: "100%", flex: 1}}>
        <MyHeader title="Items to Exchange" />

        <View style={{flex: 1}}>
          {this.state.requestedItemsList.length===0
          ? (<View>
            <Text style={{fontSize: 20, color:'black'}}>List of All Requested Items</Text>
          </View>)
          : (<FlatList keyExtractor={this.keyExtractor}
              data={this.state.requestedItemsList} 
              renderItem={this.renderItem} />)}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button:{
    backgroundColor: '#f8be85',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 7,
  }
})

