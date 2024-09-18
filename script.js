async function fetchExchangeRate() {
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/EUR'; // API para obter a taxa de câmbio
    try {
        const response = await fetch(apiUrl); // Fazendo uma solicitação à API
        if (!response.ok) {  // Verifica se a resposta está ok
            throw new Error('Erro ao buscar dados da API');
        }
        const data = await response.json(); // Converte a resposta para JSON
        return data.rates.BRL; // Retorna a taxa de câmbio BRL
    } catch (error) {
        console.error('Erro ao buscar a taxa de câmbio:', error); // Log de erro
        return null;
    }
}

async function convert() {
    const euroInput = document.getElementById('euroInput').value; // Obtém o valor digitado pelo usuário
    if (isNaN(euroInput) || euroInput <= 0) {  // Verifica se o valor inserido é válido
        alert('Por favor, insira um valor válido em euros.');
        return;
    }

    const exchangeRate = await fetchExchangeRate(); // Obtém a taxa de câmbio da API
    if (exchangeRate) {
        const realValue = (euroInput * exchangeRate).toFixed(2); // Converte euros para reais
        document.getElementById('result').innerText = `Valor em reais: R$${realValue}`; // Exibe o resultado
    } else {
        document.getElementById('result').innerText = 'Erro ao obter a taxa de câmbio.'; // Exibe erro se a taxa não for encontrada
    }
}
