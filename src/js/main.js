(function(){
	function nombrar(nombre){
		return nombre;
	}
	function saludar(nombre){
		console.info(nombre, ", hola, hola!");
	}
	saludar(nombrar("Soraya")); 
})();