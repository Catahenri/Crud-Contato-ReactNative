import React, {useState} from 'react';
import { Button, FlatList, Text, TextInput, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicon from 'react-native-vector-icons/Ionicons';


function Item(props) { 
  return (
    <View style={{
          backgroundColor: "lightgreen", 
          flex: 1,
          borderColor: "green",
          borderWidth: 3,
          marginVertical: 10,
          marginHorizontal: 5,
          flexDirection: "row"}}>
      <View style={{backgroundColor: "yellow", flex: 5}}>
        <Text style={{fontSize: 32}}>{props.item.id + " - " + props.item.nome}</Text>
        <Text style={{fontSize: 18}}>{props.item.email}</Text>
        <Text style={{fontSize: 18}}>{props.item.telefone}</Text>
      </View>
      <View style={{backgroundColor: "cyan", 
                  flex: 2,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center"}}>
        <Ionicon name="clipboard" size={32} onPress={()=>{
          props.onEditar( props.item );
          }}/>
        <Ionicon name="trash" size={32} onPress={
          ()=>{
             props.onApagar(props.item);
          }}/>
      </View>
    </View>
  );
}


const Estacionamento = (props) => {

  const [id, setId] = useState(null);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const [counter, setCounter] = useState(1);

  const [lista, setLista] = useState([
    // {id: 1, nome: "João Silva", email: "joao@teste.com", telefone: "11111"}, 
    // {id: 2, nome: "Maria Silva", email: "maria@teste.com", telefone: "22222"}, 
    // {id: 3, nome: "Pedro Silva", email: "pedro@teste.com", telefone: "33333"}, 
  ]);


  function salvar() { 
    const obj = {id: counter, nome, telefone, email};
     const trocarimagem = () => {
    setImagem(state => state === 'img1' ? 'img2': 'img1');
  }
    if (id === null) {
      const tempLista = [...lista, obj];
      setLista(tempLista);
      setCounter(counter + 1);
    } else { 
      const tempLista = [ ...lista ];
      for (let i = 0; i < tempLista.length; i++){ 
        const o = tempLista[i];
        if (o.id === id) { 
          obj.id = o.id;
          tempLista.splice(i, 1, obj);
          setLista(tempLista);
          break;
        }
      }
    }

    // Limpar os campos
    setId(null);
    setNome("");
    setTelefone("");
    setEmail("");
  }

  function editar( obj ) { 
    setId(obj.id);
    setNome(obj.nome);
    setTelefone(obj.telefone);
    setEmail(obj.email);
  }

  function apagar( obj ) { 
/*     const listaFiltrada =  lista.filter( (item)=>{ 
      if  (item.id === obj.id) { 
        return false;
      } else { 
        return true;
      }
      // return item.id !== obj.id
    }) */
    const tempLista = [ ];

    for (let i = 0; i < tempLista.length; i++){ 
      const o = tempLista[i];
      if (o.id === obj.id) { 
        tempLista.splice(i, 1);
      }
    }
    setLista(tempLista);

    // setLista(lista.filter(item=>item.id !== obj.id));
  }


  let nomeBotao = "Cadastrar";
  if (id !== null){ 
    nomeBotao = "Salvar";
  }

  return (
    <LinearGradient
        colors={['#1560bd', 'lightblue']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={{flex: 1, justifyContent:"flex-start", alignItems: "stretch", paddingVertical: 50}}>
      <Text style={{fontSize: 32, color: "white", flex: 1, textAlign:"center"}}>Agenda de Contatos</Text>
      <View style={{flex: 4}} >
        <Text>Id        {id}</Text> 
        <Text>Nome</Text> 
        <TextInput value={nome} onChangeText={setNome}/>
        <Text>Telefone</Text>
        <TextInput value={telefone} onChangeText={setTelefone}/>
        <Text>Email</Text>
        <TextInput value={email} onChangeText={setEmail}/>
        <Button title={nomeBotao} onPress={salvar}/>
      </View>
      <FlatList data={lista} renderItem={(props)=>{
          return (
              <Item {...props} onEditar={editar} onApagar={apagar}/>
          );
        }
      }/>   
    </LinearGradient>
  );
}
export default Estacionamento
