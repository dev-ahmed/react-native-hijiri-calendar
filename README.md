### Installation

```
$ npm install --save react-native-calendars
```
no native module linking is required.


### Usage

```javascript
import React,  from 'react';
import { StyleSheet, View } from 'react-native';
import { HCalendar } from 'react-native-hijiri-calendar';

export default ({}) => {

  return (
    <View style={styles.container}>
      <HCalendar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

### Contributing

Pull requests are very welcome 

