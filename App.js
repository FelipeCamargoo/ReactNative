import React, {useState, useEffect} from 'react';
import { SafeAreaView, Text, Button, StyleSheet, Vibration,TextInput} from 'react-native';
const App = () => {
 const [segundos, setSegundos] = useState('');
 const [status, setStatus] = useState(false);
 useEffect(() => {
   let interval = null;
   if (status) {
     interval = setInterval(() => {
       setSegundos((anterior) => {
         if (anterior - 1 === parseFloat(segundos)) {
           Vibration.vibrate(5000);
           clearInterval(interval);
           setStatus(false);
           return segundos;
         }
         return anterior - 1;
       });
     }, 1000);
   } else if(status && parseFloat(segundos) !== 0) {
     clearInterval(interval);
   }
   return () => clearInterval(interval);
 }, [status, segundos]);
 const botao = () => {
     setSegundos(segundos);
   setStatus(true);
 };

 return (
<SafeAreaView style={styles.container}>

<TextInput
style={styles.input}

keyboardType = "numeric"

onChangeText={text => setSegundos(text)}
/>

<Text style={styles.cronometro}>{segundos > 0 ? segundos : '00'}</Text>
<Button title="Iniciar" onPress={botao} />
</SafeAreaView>
 );
};
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
   },
   cronometro: {
     fontSize: 60,
     marginBottom: 20
   },
   input:{
height: 50,
borderColor: '#DCDCDC',
borderWidth: 2,
marginBottom: 16,
paddingHorizontal: 10,
width: '80%',
color: '#ffffff',
textAlign: 'center',
fontSize: 18,
paddingBottom: 12
}
 });
 export default App;
