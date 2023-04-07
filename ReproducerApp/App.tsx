import React, {useState} from 'react';

import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';

export default function App(): JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        padding: 48,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <ListDemo />
    </View>
  );
}

function ListDemo() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [show, setShow] = useState(true);

  const style = {backgroundColor: 'orange'};

  const switchButton = (
    <TouchableOpacity
      style={{
        height: 48,
        width: 300,
        alignItems: 'center',
        backgroundColor: 'red',
        justifyContent: 'center',
      }}
      onPress={() => setShow(show => !show)}>
      <Text style={{color: 'white'}}>Switch</Text>
    </TouchableOpacity>
  );

  if (show)
    return (
      <>
        {switchButton}
        <FlatList
          data={data}
          style={style}
          refreshing={false}
          renderItem={GenericListItem}
          onRefresh={() => console.log('List #1 refresh is called')}
        />
      </>
    );

  return (
    <>
      {switchButton}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <FlatList
          data={data}
          style={style}
          refreshing={false}
          renderItem={GenericListItem}
          onRefresh={() => console.log('List #2 refresh is called')}
        />

        {/* Breaks refresh handling of both lists occasionally */}
        <FlatList
          data={data}
          renderItem={GenericListItem}
          style={{backgroundColor: 'purple'}}
        />

        {/* The same applies to the normal ScrollView component */}
        <ScrollView style={{backgroundColor: 'blue'}}>
          {data.map(item => (
            <GenericListItem key={item} />
          ))}
        </ScrollView>
      </View>
    </>
  );
}

function GenericListItem() {
  return (
    <View style={{width: 300, height: 48}}>
      <Text>Generic test item</Text>
    </View>
  );
}
