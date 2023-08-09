import { View, Text, StyleSheet, SafeAreaView, ScrollView,Button, } from 'react-native'
import React , {useState} from 'react'
import { useSelector } from 'react-redux';
import MyAccountnotLogin from '../components/MyAccountnotLogin';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/Colors';


export default function Help() {
  const token = useSelector(state => state.authReducer.token);
  if (token === ''){
    return <MyAccountnotLogin lable="Sign up or Login to get the help"/>;
  }

  const [ activeSections, setActiveSections ] = useState([]);
  const sections = [
    {
      title: 'General',
      content: 
      <>
        <Text style={styles.textSmall}>What are the advantages of purchasing a bus ticket with RBus?</Text>
        <Text>RBus is India’s largest bus tickets company and therefore, you will find the largest option of bus seats on the site. Some of the advantages of dealing with us are:</Text>
        <View>
          <Text>- You can choose your seat</Text>
          <Text>- You can book your bus tickets online, by phone, or in person</Text>
          <Text>- You can choose from over 1500+ bus operators</Text>
          <Text>- You can choose from buses based on boarding points, timing and bus type</Text>
        </View>
      </>
    },
    {
      title: 'Ticket Related',
      content: 
      <>
        <Text style={styles.textSmall}>I've lost my ticket. What should I do now?</Text>
        <Text>A copy of the ticket would have been sent to you by e-mail when you booked it. Please take a printout of that mail and produce it at the time of boarding. If you have not received the ticket e-mail, please call any of our call centers and our executive will re-send you a copy by mail.</Text>
      </>
    },
    {
      title: 'Payment Related',
      content:  
      <>
        <Text style={styles.textSmall}>What payment options do I have?</Text>
        <Text>1. Credit card</Text>
        <Text>2. Debit card</Text>
        <Text>3. Internet banking (Internet enabled online bank account)</Text>
        <Text>4. Wallets</Text>
      </>
    },
    {
      title: 'Cancellation Related',
      content:  
      <>
         <Text style={styles.textSmall}>Can I cancel my ticket online?</Text>
         <Text>Most of the tickets can be cancelled online. However, there are some tickets that can only be cancelled through our call center. However please note that the cancellation fee and cancellation period may differ for specific bus services. Please contact any of our executives for cancellation details on any specific service.</Text>
      </>
    },
    {
      title: 'Refund Related',
      content:  
      <>
        <Text style={styles.textSmall}>I missed the bus. Do I get a refund?</Text>
        <Text>RBus provides a 100% refund if the bus is missed due to either redBus or its’ partner company's fault. However, if the bus is missed due to any other reason not directly related to RBus no refund is provided.</Text>
      </>
    },
  ];
  function renderHeader(section, _, isActive) {
    return (
      <View style={styles.accordHeader}>
        <Text style={styles.accordTitle}>{ section.title }</Text>
        <Icon name={ isActive ? 'chevron-up' : 'chevron-down' }
              size={20} color="#bbb" />
      </View>
    );
  };

  function renderContent(section, _, isActive) {
    return (
      <View style={styles.accordBody}>
        {section.content}
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}>
          <Accordion
            align="bottom"
            sections={sections}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={(sections) => setActiveSections(sections)}
            sectionContainerStyle={styles.accordContainer}
          />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  accordContainer: {
    padding : 5
  },
  accordHeader: {
    padding: 12,
    backgroundColor: COLORS.WHITE,
    color: '#eee',
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  accordTitle: {
    fontSize: 15,
    fontWeight : 'bold',
  },
  accordBody: {
    padding: 12
  },
  textSmall: {
    fontSize: 14,
    fontWeight : 'bold',
    marginBottom : 5,
  },
  seperator: {
    height: 12
  }
});