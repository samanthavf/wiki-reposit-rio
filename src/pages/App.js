import React from 'react';
import {useState} from 'react'
import gitlogo from "../assets/git-logo.png"
import Input from "../components/input";
import Button from "../components/Button";
import ItemRepo from '../components/ItemRepo';
import {api} from '../services/api';

import { Container } from './styles';


function App() {

 const [currentRepo, setCurrentRepo] = useState('');
 const [repos, setRepos] = useState([]);


 const handleSearchRepo = async ()  => {

  const {data} = await api.get('repos/${currentRepo}')
 
  if(data.id){
    const isExist = repos.find(repo => repo.id === data.id)

    if(!isExist){
    setRepos(prev => [...prev, data]);
    setCurrentRepo('')
    }
    else{
      alert('Repositório já inserido')
    }
  } else {
    alert('Repositório não encontrado');
  }
}

const handleRemoveRepo = (id) => {
  setRepos(repos.filter(repo => repo.id !== id));
}

return (
  <Container>
    <img src={gitlogo} width={82} height={82} alt="github logo"/>
    <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
    <Button onClick={handleSearchRepo}/>
    {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} key={repo.id} />)}
  </Container>
);
}

export default App;
