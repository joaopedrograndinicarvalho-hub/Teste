let botão = document.querySelector(".botão-gerar")

let chave = "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"

let endereco = "https://api.groq.com/openai/v1/chat/completions"

async function gerarCodigo() {

    let textoUsuario = document.querySelector(".caixa-texto").value

    let blocoCodigo = document.querySelector(".bloco-codigo")

    let resultadoCodigo = document.querySelector(".resultado-codigo")

    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + chave
        },

        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{
                role: "system",
                content: "Você é um gerador de código HTML e CSS. Responda SOMENTE com código puro. NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga EXATAMENTE o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate."
            }, {
                role: "user",
                content: textoUsuario
            }]

        })
    })

    let dados = await resposta.json()
    
    let resultado = dados.choices[0].message.content
    
    blocoCodigo.textContent = resultado
    
    resultadoCodigo.srcdoc = resultado

}

botão.addEventListener("click", gerarCodigo)
