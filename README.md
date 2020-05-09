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
      <HCalendar selectedDates={[
      {
        from: '1441/9/1',
        to: '1441/9/5',
        style: { borderColor: 'blue' },
      },
      {
        from: '1441/9/4',
        to: '1441/9/12',
        style: { borderColor: 'green' },
      },
  ]}/>
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

| Prop             | Type       | default   |
| ---------------- | ---------- | --------- |
| containerStyle   | `style`    | {}        |
| fontStyle        | `style`    | {}        |
| weekDaysStyle    | `style`    | {}        |
| currentDayStyle  | `style`    | {}        |
| headerStyle      | `style`    | {}        |
| dayNameFontStyle | `style`    | {}        |
| onPrev           | `Function` | Undefined |
| onNext           | `Function` | Undefined |
| locale           | `String`   | "en"      |
| selectedDates    | `Object`   | "[]"      |

### Contributing

Pull requests are very welcome.
