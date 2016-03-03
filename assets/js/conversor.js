(function(exports) {
  "use strict";

  function Medida(valor,tipo)  
  {
    /* tipo es opcional. Debería admitir  new Medida("45.2 Km") */
    /* ademas de new Medida(45.2, "Km") */
	this.valor = valor;
	this.tipo = tipo;
  }
  
  //TEMPERATURA*********************************************************
  
  function Temperatura(valor,tipo)
  {
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
	Medida.call(this, valor, tipo);
	//No specific prop.
  }
  
  Temperatura.prototype = Object.create(Medida.prototype); //Avoid new
  Temperatura.prototype.constructor = Medida;
  
  //CELSIUS*************************************************************
  
  function Celsius(valor)
  {
	  Temperatura.call(this, valor, 'c');
  }
  
  Celsius.prototype = Object.create(Temperatura.prototype); //Heir
  Celsius.prototype.constructor = Temperatura;
  
  //Pasar de Celsius a Farenheit
  Celsius.prototype.toFarenheit = function() {
	  var resultado = (this.valor*1.8 + 32);
	  return resultado;
  }
  
  //Pasar de Celsius a Kelvin
  Celsius.prototype.toKelvin = function() {
	  var resultado = (this.valor + 273.15);
	  return resultado;
  }
  
  //FAHRENHEIT****************************************************************
  
  function Farenheit(valor)
  {
	  Temperatura.call(this, valor, 'f')
  }
  
  Farenheit.prototype = Object.create(Temperatura.prototype);
  
  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        //regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i;
		regexp		= XRegExp('^\\s*(?<num> [+-]?\\d+(?:\\.\\d*)?(?:e[+-]?\\d+)?)\\s*  # numero  \n' +
                          '(?<formato1> [KFC])\\s+  # formato1 (origen) \n' +
                          '(?<to> to\\s+)?' +
                          '(?<formato2> [KFC])\\s*$ # formato2 (destino) \n', 'xi'),
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
