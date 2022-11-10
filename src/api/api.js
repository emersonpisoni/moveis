import axios from "axios";

export function http() {
  const base_url = 'https://itemdonation-1666725245445.azurewebsites.net'
  const userId = 'c1786691-3284-4095-a122-aa7465f6722e'

  async function createUser({ nome, email, telefone, senha }) {
    return await axios.post(`${base_url}/pessoa`, {
      nome,
      email,
      telefone,
      senha
    })
  }

  async function getDonations() {
    return await axios.get(`${base_url}/doacao`)
  }

  async function getUserById() {
    return await axios.get(`${base_url}/pessoa/${userId}`)
  }

  async function getDonationByUser() {
    return await axios.get(`${base_url}/doacao/pessoa/${userId}`)
  }

  async function postRequisicao({ doacaoId, status, nomeRequisitante, emailRequisitante, telefoneRequisitante }) {
    return await axios.post(`${base_url}/requisicao`, {
      doacaoId,
      status,
      nomeRequisitante,
      emailRequisitante,
      telefoneRequisitante
    })
  }

  async function getConservations() {
    return await axios.get(`${base_url}/conservacao`)
  }

  async function getCategories() {
    return await axios.get(`${base_url}/categorias`)
  }

  async function getItens() {
    return await axios.get(`${base_url}/itens`)
  }

  async function getStatus() {
    return await axios.get(`${base_url}/status`)
  }

  async function postDonation({ titulo, descricao, conservacaoId, categoriaId, itemId, endereco, bairro, cidade, estado, status, retirar }) {
    return await axios.post(`${base_url}/doacao`, {
      titulo,
      descricao,
      retirar,
      conservacaoId,
      categoriaId,
      itemId,
      pessoaId: userId,
      endereco,
      bairro,
      cidade,
      estado,
      status,
    })
  }

  return {
    createUser,
    getDonations,
    getUserById,
    postRequisicao,
    getDonationByUser,
    postDonation,
    getConservations,
    getCategories,
    getItens,
    getStatus,
  }
}