// função para converter o "id" em number
  // poderiamos usar o Object.hasOwn(), mas nesse caso ele não aceita regex, tem essa necessidade de verificar se é "Id" ou "id"
  

module.exports = (objectParams) => {
  // vamos percorrer as props
  for (let props in objectParams) {
    
    // se alguma prop for do tipo "Id ou id", enle entra na condição
    if(/Id|id/.test(props)){
      objectParams[props] = Number(objectParams[props]) // e por fim converte para number
    }    
  }
  return objectParams
}
