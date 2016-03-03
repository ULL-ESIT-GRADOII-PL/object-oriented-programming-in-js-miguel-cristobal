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
  
  Farenheit.prototype.toCelsius = function() {
	  var resultado = (this.valor - 32)*5/9;
	  return resultado;
  }
  
  Farenheit.prototype.toKelvin = function() {
	  var resultado = (this.valor + 459.67)*5/9;
	  return resultado;
  }
  
  //KELVIN***********************************************************************
  function Kelvin(valor)
  {
	  Temperatura.call(this, valor, 'k')
  }
  
  Kelvin.prototype = Object.create(Temperatura.prototype);
  
  Kelvin.prototype.toCelsius = function() {
	  var resultado = (this.valor - 273.15);
	  return resultado;
  }
  
  Kelvin.prototype.toFarenheit = function() {
	  var resultado = (this.valor * 9/5)-459.67;
	  return resultado;
  }
  
  //FIN DE LAS CLASES.............
  
  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;
  exports.Kelvin = Kelvin;

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        //regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i;
	regexp	= XRegExp('^\\s*(?<num> [+-]?\\d+(?:\\.\\d*)?(?:e[+-]?\\d+)?)\\s*  # numero  \n' +
                          '(?<formato1> [KFC])\\s+  # formato1 (origen KFC XD) \n' +
                          '(?<to> to\\s+)? # Opcionalidad \n' +
                          '(?<formato2> [KFC])\\s*$ # formato2 (destino KFC XD) \n', 'xi'),
        valor     = valor.match(regexp);
		console.log("Valor vale: " + valor);
    
    if (valor) {
      var numero = valor[1],
          tipo   = valor[2].toLowerCase(),
		  destino = valor[4].toLowerCase();
      
      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo + ", Dest: " + destino);
      
      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
			if (destino == 'c')
				elemento.innerHTML = "Ya está en ese formato."
			if (destino == 'k')
				elemento.innerHTML = celsius.toKelvin().toFixed(2) + " Kelvin";
			if (destino == 'f')
				elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
		  if (destino == 'f')
			elemento.innerHTML = "Ya está en ese formato."
		  if (destino == 'k')
			elemento.innerHTML = farenheit.toKelvin().toFixed(2) + " Kelvin";
		  if (destino == 'c')
			elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          break;
		case 'k':
          var kelvin = new Kelvin(numero);
          if (destino == 'k')
			elemento.innerHTML = "Ya está en ese formato."
		  if (destino == 'f')
			elemento.innerHTML = kelvin.toFarenheit().toFixed(2) + " Farenheit";
		  if (destino == 'c')
			elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
          break;
        
        default:
          /* rellene este código */
		  elemento.innerHTML = "Error!: El tipo a convertir debe ser KFC";
      }
    }
    else
      elemento.innerHTML = "";
  };
})(this);
