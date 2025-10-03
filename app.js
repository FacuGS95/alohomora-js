function simuladorAlohomoraStore() {
  let casa;
  let repetir = true;

  const gryffindor = "Gryffindor";
  const hufflepuff = "Hufflepuff";
  const ravenclaw = "Ravenclaw";
  const slytherin  = "Slytherin";

  while (repetir) {
    let seleccion = prompt(
      "Bienvenid@ a Hogwarts, ¿A qué casa de Hogwarts perteneces?: \n1. Gryffindor \n2. Hufflepuff \n3. Ravenclaw \n4. Slytherin");

    switch (seleccion) {
      case "1":
        casa = gryffindor;
        break;
      case "2":
        casa = hufflepuff;
        break;
      case "3":
        casa = ravenclaw;
        break;
      case "4":
        casa = slytherin;
        break;
      default:
        casa = "los Muggles";
        break;
    }

    console.log("El usuario pertenece a la casa de " + casa);
    alert("Bienvenid@ a la casa de " + casa);

    if (casa === gryffindor) {
      alert("¡Eres valiente y audaz!");
    } else if (casa === hufflepuff) {
      alert("¡Eres leal y trabajador!");
    } else if (casa === ravenclaw) {
      alert("¡Eres inteligente y sabio!");
    } else if (casa === slytherin) {
      alert("¡Eres astuto y ambicioso!");
    } else {
      alert("¡Eres un muggle!");
    }

    repetir = confirm("¿Querés volver a elegir una casa?");
  }
}
simuladorAlohomoraStore();



