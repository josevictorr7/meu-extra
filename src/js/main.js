const form = document.getElementById("request-form");
const resultadoDiv = document.getElementById("resultado");
const horaValor = document.getElementById("hora-valor");
const valorHoraValor = document.getElementById("valor-hora-valor");
const totalHorasValor = document.getElementById("total-horas-valor");
const salarioInput = document.getElementById("salario");
const tempoInput = document.getElementById("tempo");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const carga = parseFloat(document.getElementById("carga").value);
  const tempo = document.getElementById("tempo").value;
  const porcentagem = parseFloat(document.getElementById("porcentagem").value);

  let salarioInput = document.getElementById("salario").value;
  let salarioLimpo = limparSalario(salarioInput);
  let salario = parseFloat(salarioLimpo);

  if (isNaN(salario) || salario <= 0) {
    alert("Por favor, insira um salário válido (apenas números).");
    return;
  }

  const horasExtras = converterHoras(tempo);
  const valorHora = salario / carga;
  const valorHoraExtra = valorHora * (1 + porcentagem / 100);
  const totalHorasExtras = valorHoraExtra * horasExtras;

  horaValor.textContent = formatarHoras(horasExtras);

  valorHoraValor.textContent = `R$ ${valorHoraExtra.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  totalHorasValor.textContent = `R$ ${totalHorasExtras.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  resultadoDiv.style.display = "block";
});

salarioInput.addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");

  if (value === "") {
    e.target.value = "";
    return;
  }

  value = (parseInt(value, 10) / 100).toFixed(2);

  value = value.replace(".", ",");

  e.target.value = "R$ " + value;
});

function limparSalario(valor) {
  if (!valor) return 0;
  return parseFloat(valor.replace(/\D/g, "")) / 100;
}

function converterHoras(horasStr) {
  const partes = horasStr.split(":");
  const horas = parseInt(partes[0]) || 0;
  const minutos = parseInt(partes[1]) || 0;

  return horas + minutos / 60;
}

function limparSalario(valor) {
  let limpo = valor.replace(/[^\d,.-]/g, "");
  limpo = limpo.replace(",", ".");
  return limpo;
}

function formatarHoras(horasDecimais) {
  const horas = Math.floor(horasDecimais);
  const minutos = Math.round((horasDecimais - horas) * 60);
  return `${horas}:${minutos.toString().padStart(2, "0")}`;
}
