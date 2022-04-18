import React, {Component} from 'react';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {View, Button} from 'react-native';

export default class App extends Component {
  captureAndShareScreenshot = () => {
    this.refs.viewShot.capture().then(uri => {
      RNFS.readFile(uri, 'base64').then(res => {
        let urlString = 'data:image/jpeg;base64,' + res;
        let options = {
          title: 'Share Title',
          message: 'Share Message',
          url: urlString,
          type: 'image/jpeg',
        };
        Share.open(options)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            err && console.log(err);
          });
      });
    });
  };

  render() {
    return (
      <ViewShot
        style={{flex: 1}}
        ref="viewShot"
        options={{format: 'jpg', quality: 0.9}}>
        <View>
          <Button
            style={{}}
            title="Capture and Share"
            onPress={this.captureAndShareScreenshot}
          />
        </View>
      </ViewShot>
    );
  }
}
