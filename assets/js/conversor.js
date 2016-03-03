(function(exports) {
  "use strict";

  function Medida(valor,tipo)  
  {
    /* tipo es opcional. Debería admitir  new Medida("45.2 Km") */
    /* ademas de new Medida(45.2, "Km") */
	this.valor = valor;
	this.tipo = tipo;
  }
  
  function Temperatura(valor,tipo)
  {
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
	Medida.call(this, valor, tipo);
	//No specific prop.
  }
  
  Temperatura.prototype = Object.create(Medida.prototype); //Avoid new
  Temperatura.prototype.constructor = Medida;
  
  function Celsius(valor)
  {
	  Temperatura.call(this, valor, 'c');
  }
  
  Celsius.prototype = Object.create(Temperatura.prototype); //Heir
  Celsius.prototype.constructor = Temperatura;
  
  Celsius.prototype.toFarenheit = function() {
	  //Pasar de Celsius a Farenheit
	  var resultado = (this.valor*1.8 + 32);
	  return resultado;
  }
  
  Celsius.prototype.toKelvin = function() {
	  //Pasar de Celsius a Kelvin
	  var resultado = (this.valor + 273.15);
	  return resultado;
  }
  
  function Farenheit(valor)
  {
  }
  
  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i;
    valor     = valor.match(regexp);
    
    if (valor) {
      var numero = valor[1],
          tipo   = valor[2].toLowerCase();
      
      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo);
      
      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          break;
		case 'k':
          var kelvin = new Kelvin(numero);
          elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          break;
        
        default:
          /* rellene este código */
		  elemento.innerHTML = "El tipo a convertir debe ser Celsius o Farenheit";
      }
    }
    else
      elemento.innerHTML = "";
  };
})(this);
