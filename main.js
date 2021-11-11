async function readJson(path) {
    const response = await fetch(path);
    const data = await response.json();
    return data;
  }

  async function init() {
    // json file generated with https://csvjson.com/csv2json
    const data = await readJson('future_cities_data.json');
    let simplifiedData = data.map((d) => {
      return {
        annualMeanTemp: d['Annual_Mean_Temperature'],
        futureAnnualMeanTemp: d['future_Annual_Mean_Temperature'],
        city: d['current_city'],
      };
    });

    console.log('simplifiedData: ', simplifiedData);

    

//erstellt fläche
      const svg = d3 // eine variable wird mit der d3 libari verlinkt
      .select('#d3') // wählt id von html file aus
      .append('svg') // erstellt ein svg
    .attr("width", 2000) // das svg erhält das attribut weite 2000
    .attr("height", 2000); // das svg erhält das attribut höhe 200

      const shape = svg.selectAll('circle').data(simplifiedData).enter(); // die funktion data() und enter() fügen die daten hinzu
      const texte = svg.selectAll('text').data(simplifiedData).enter();

 
// Form erstellen
shape
.append('circle')
.attr('cx', (value, index) => {
    return index * 200+100;
  })
.attr('cy', 100)
.attr('r', (value, index) => {
    return value.futureAnnualMeanTemp * 2;
  })
.attr('id','deko');


// text erstellen
texte
.append('text')
.attr('x', (value, index) => {
        return index * 200+100;
      })
.attr('y',200)
.attr('id','dekotext')
.text( (value, index) => {
        return value.futureAnnualMeanTemp ;
      })




  }
      init();