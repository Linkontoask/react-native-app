import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  TextInput,
  Alert
} from 'react-native';
import { WebBrowser } from 'expo';
import axios from '../utils/axios';
// react-native-storage

import { MonoText } from '../components/StyledText';

class Test extends React.Component {
  render() {
    let props = this.props;
    return (
      <Text>{props.title} - {props.releaseYear} Year</Text>
    )
  }
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: 'Useless Placeholder',
      list: []
    };
  }

  async componentWillMount() {
    const data = await axios.get('https://facebook.github.io/react-native/movies.json');
    this.setState({
      list: data.movies
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <TextInput style={styles.input}
                       multiline={false}
                       iosclearButtonMode='always'
                       iosclearTextOnFocus={true}
                       iosreturnKeyType='next'
                       ioskeyboardAppearance='dark'
                       keyboardType='email-address'
                       returnKeyType='done'
                       onChangeText={(text) => this.setState({text})}
                       value={this.state.text}>
            </TextInput>
            <Text>{this.state.text}</Text>
            {this.state.list.map(item => {
              return (
                <Test title={item.title} releaseYear={item.releaseYear} key={item.id}/>
              )
            })}
          </View>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={t => this._handleHelpPress('weixin://scanqrcode')} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>调用APP - 微信 - 测试</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.helpContainer}>
              <TouchableOpacity onPress={t => this._handleHelpPress('alipay://platformapi/startapp?appId=20000056')} style={styles.helpLink}>
                  <Text style={styles.helpLinkText}>调用APP - 支付宝(支付) - 测试</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://linkorg.club/');
  };

  _handleHelpPress = (url) => {
      Linking.canOpenURL(url).then(supported => {
          console.log(supported);
          if (!supported) {
              return Linking.openURL(url);
          } else {
              return Linking.openURL(url);
          }
      }).catch(err => console.error('An error occurred', err));
    /*WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );*/
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    width: 200,
    height: 32,
    borderWidth: 1,
    marginTop: 24,
    borderRadius: 4,
    padding: 4,
    borderColor: '#a8a8a8'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    flex: 1
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
