// Função para buscar a taxa de câmbio via API
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

// Função para converter euros para reais
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

// Função para adicionar um gasto na lista
function addExpense() {
    const expenseDescription = document.getElementById('expenseDescription').value;
    const expenseValue = document.getElementById('expenseValue').value;

    // Verificar se os campos estão preenchidos
    if (expenseDescription.trim() === "" || expenseValue.trim() === "" || isNaN(expenseValue) || expenseValue <= 0) {
        alert("Por favor, preencha a descrição e o valor do gasto corretamente.");
        return;
    }

    // Criar novo item de gasto
    const expenseList = document.getElementById('expenseList');
    const newExpense = document.createElement('li');
    newExpense.innerHTML = `
        ${expenseDescription} - R$${parseFloat(expenseValue).toFixed(2)}
        <button onclick="removeExpense(this, ${expenseValue})">Remover</button>
    `;

    // Adicionar novo item à lista
    expenseList.appendChild(newExpense);

    // Atualizar total de gastos
    updateTotalExpense(parseFloat(expenseValue));

    // Limpar campos
    document.getElementById('expenseDescription').value = '';
    document.getElementById('expenseValue').value = '';
}

// Função para remover um gasto da lista
function removeExpense(element, value) {
    const expenseList = document.getElementById('expenseList');
    expenseList.removeChild(element.parentElement);

    // Atualizar total de gastos
    updateTotalExpense(-parseFloat(value));
}

// Função para atualizar o total de gastos
function updateTotalExpense(value) {
    const totalExpenseElement = document.getElementById('totalExpense');
    let currentTotal = parseFloat(totalExpenseElement.innerText.replace('Total de gastos: R$', ''));
    
    currentTotal += value;
    totalExpenseElement.innerText = `Total de gastos: R$${currentTotal.toFixed(2)}`;
}
