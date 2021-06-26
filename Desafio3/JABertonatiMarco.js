function showParr(texto, quantyWordText, totalWords, timeInterval) {
  console.log("Entro a la función ShowParr");

  let arrayText = texto.split(" ");
  let indice = 0;
  let myInterval = setInterval(() => {
    console.log(`👉 ${arrayText[indice]}`);
    indice++;

    if (indice == arrayText.length) {
      clearInterval(myInterval);
      console.log("setInterval finalizado");
      console.log("/*----------------*/");
      totalWords(quantyWordText + arrayText.length);
    }
  }, timeInterval);

  console.log("Salio de la función ShowParr");
}

showParr("Texto Uno", 0, (totalWords) => {
    showParr( "Parrafo dos", totalWords, (totalWords) => {
        showParr( "Conclusión 3", totalWords, (totalWords) => {
            console.log(`Proceso terminado.`);
            console.log(`La cantidad de palabras total es ${totalWords}.`);
          },
          2000
        );
      },
      2000
    );
  },
  2000
);
