import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native'
import { NativeBaseProvider, Button } from "native-base";

export default function App() {
  const [poids, setPoids] = useState()
  const [taille, setTaille] = useState()
  const [imc, setImc] = useState(0)
  const [analyse, setAnalyse] = useState("")

  const calcul = () => {
    let imc = (poids / Math.pow(taille / 100, 2)).toFixed(1)
    setImc(imc)

    if(imc < 18.5){
      setAnalyse("Insuffisance pondérale")
    } else if(imc > 18.5 && imc < 24.9){
      setAnalyse("Poids normal")
    } else if(imc > 25 && imc < 29.9){
      setAnalyse("Surpoids")
    } else{
      setAnalyse("Obésité")
    }
  }

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Calculer votre IMC</Text>

        <View>
          <Text>Votre poids (kg)</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPoids}
            value={poids}
            placeholder="Entrez votre poids en KG"
          />
        </View>
        <View>
          <Text>Votre taille (cm)</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTaille}
            value={taille}
            placeholder="Entrez votre taille en CM"
          />
        </View>
        <Button onPress={calcul} style={styles.button} size={'lg'}>Calculer</Button>
        {imc != 0 && 
        <View style={styles.result}>
          <Text style={styles.resultText}>Votre IMC : 
            <Text style={styles.analyseText}> {imc}</Text>
          </Text>
          <Text style={styles.resultText}>Vous êtes en : 
            <Text style={styles.analyseText}> {analyse}</Text>
          </Text>
        </View>
        }
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    fontFamily: 'Helvetica',
    marginBottom: 50
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#056273",
    fontFamily: 'Helvetica',
  },
  result: {
    marginVertical: 40,
  },
  resultText: {
    fontSize: 20,
    fontFamily: 'Helvetica',
  },
  analyseText: {
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  }
});
