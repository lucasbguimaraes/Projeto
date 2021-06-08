const { json, request, response } = require('express')
const express = require ('express')
const uuid= require ('uuid')
const app = express()
app.use(express.json())
let funcionarios=[
    {
        id:uuid.v4(),nome:'Lucas Batalha',email:'lbatalha88@gmail.com',funcao:'tecnico de som',telefone:'24981432328',departamento:'Faxineiro'
    
    },
    {
        id:uuid.v4(),nome:'Leo Batalha',email:'lbatalha541@gmail.com',funcao:'engenheiro',telefone:'24981342001',departamento:'Diretoria'
    }

]

console.log(funcionarios)
//middleware

const verificacadastro =(request, response, next) =>{
    const{nome,funcao,departamento,  email, telefone}= request.body
    if(!nome ||  !funcao || !departamento ||  !email ||  !telefone){
        return response
        .status(400)
        .json({ Error: 'verificar se esta sobrando algun campo sem preencimento'})
    }
        return next()

}
const checkIdInarry=(request, response,next)=>{
    const{id}= request.params
    const listarid = funcionarios.find(funcionario => funcionario.id=== id)
    if(!listarid){
        return response
        .status(400)
        .json({Erro:'O Id é inexistente'})
    }
    
    return next()

}
//listar todos
app.get('/funcionarios', (request, response) =>{
    return response
    .status(200)
    .json(funcionarios)
})

//listar por id
app.get('/funcionarios/:id',checkIdInarry, (request, response)=>{
    const{id}= request.params
    const telefone= funcionarios.filter(func=> func.id==id)
    return response
    .status(200)
    .json(telefone)
})

//excluir pelo id

app.delete('/funcionarios/:id',checkIdInarry, (request, response) =>{
    const {id}= request.params
    const indice = funcionarios.findIndex(funcionarios => funcionarios.id==id)
    console.log(indice)
    console.log(funcionarios[indice])
    funcionarios.splice(indice, 1)
    return response
    .status(200)
    .json({massage: 'Registro excluido com sucesso !!!!'})

})
//alterar pelo id

app.put('/funcionarios/:id',verificacadastro,checkIdInarry, (request, response)=>{
    const{nome, funcao, departamento, email, telefone}=request.body
    const{id}=request.params
    let indice= funcionarios.findIndex(funcionarios =>funcionarios.id==id)
    const dadosfuncionarios={
        id,
        nome,
        funcao,
        departamento,
        email,
        telefone,
    }
    funcionarios.splice(indice, 1, dadosfuncionarios)
    return response
    .status(200)
    .json(dadosfuncionarios)
})
   //cadastrar funcionários
   app.post('/funcionarios',verificacadastro,(request,response)=>{
       const{nome,email,funcao,departamento,telefone}=request.body
       const incluirfuncionarios={
           id:uuid.v4(),
           nome,
           email,
           funcao,
           departamento,
           telefone
       }
       funcionarios=[...funcionarios,incluirfuncionarios]
       return response
       .status(200)
       .json(incluirfuncionarios)
   })




app.listen(3333,  () => {
    console.log ('servidor rodando!!')
})