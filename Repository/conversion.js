'use strict'

var moment = require('moment');
moment().format('MMMM Do YYYY, h:mm:ss a');

var conversion={

   stringDate:function(fecha1, fecha2, fecha3, fecha4) {
      
                    
      if(fecha1 != "000000000000"){
             //primera entrada
         fecha1=(fecha1).slice(0, 4) + "."+ (fecha1).slice(4);
         fecha1=(fecha1).slice(0, 7) + "."+ (fecha1).slice(7);
         fecha1=(fecha1).slice(0, 10) + " "+ (fecha1).slice(10);
         fecha1=(fecha1).slice(0, 13) + ":"+ (fecha1).slice(13);
         
         //primera salida
         fecha2=(fecha2).slice(0, 4) + "."+ (fecha2).slice(4);
         fecha2=(fecha2).slice(0, 7) + "."+ (fecha2).slice(7);
         fecha2=(fecha2).slice(0, 10) + " "+ (fecha2).slice(10);
         fecha2=(fecha2).slice(0, 13) + ":"+ (fecha2).slice(13);

          var entrada1 = moment(fecha1,'YYYY.MM.DD HH:mm');
          var salida1 = moment(fecha2,'YYYY.MM.DD HH:mm');

          var resta1 = salida1.diff(entrada1, "minutes")
          var suma =resta1

          if(fecha3 != "000000000000" /*|| fecha3 !=" " || fecha3 != undefined || fecha3 != null*/){
            console.log("entro")
            //segunda entrada
            fecha3=(fecha3).slice(0, 4) + "."+ (fecha3).slice(4);
            fecha3=(fecha3).slice(0, 7) + "."+ (fecha3).slice(7);
            fecha3=(fecha3).slice(0, 10) + " "+ (fecha3).slice(10);
            fecha3=(fecha3).slice(0, 13) + ":"+ (fecha3).slice(13);

            //segunda salida
            fecha4=(fecha4).slice(0, 4) + "."+ (fecha4).slice(4);
            fecha4=(fecha4).slice(0, 7) + "."+ (fecha4).slice(7);
            fecha4=(fecha4).slice(0, 10) + " "+ (fecha4).slice(10);
            fecha4=(fecha4).slice(0, 13) + ":"+ (fecha4).slice(13);

            var entrada2 = moment(fecha3,'YYYY.MM.DD HH:mm');
            var salida2 = moment(fecha4,'YYYY.MM.DD HH:mm');

            var resta2 = salida2.diff(entrada2, "minutes")
            suma=suma+resta2
         }else{
            suma=suma+0
         }


      }else{
         suma=0
      }                    
        console.log(suma)

      

         var minutos=suma/60
         
         if((minutos/10)<1){
               var horas=minutos.toString()
                horas=horas.substr(0,1)
         }else{
               var horas=minutos.toString()
                horas=horas.substr(0,2)
         }
         
         var a=horas*60
         var restaMinutos=suma-a
         console.log(horas)
         console.log(restaMinutos)
         
         var vector=[horas, restaMinutos]

      return vector

   },


   Rendimiento:function(fechaInicial, fechaFinal, cantidad) {
      
                    
       fechaInicial=(fechaInicial).slice(0, 4) + "."+ (fechaInicial).slice(4);
       fechaInicial=(fechaInicial).slice(0, 7) + "."+ (fechaInicial).slice(7);
       fechaInicial=(fechaInicial).slice(0, 10) + " "+ (fechaInicial).slice(10);
       fechaInicial=(fechaInicial).slice(0, 13) + ":"+ (fechaInicial).slice(13);
       
       
       fechaFinal=(fechaFinal).slice(0, 4) + "."+ (fechaFinal).slice(4);
       fechaFinal=(fechaFinal).slice(0, 7) + "."+ (fechaFinal).slice(7);
       fechaFinal=(fechaFinal).slice(0, 10) + " "+ (fechaFinal).slice(10);
       fechaFinal=(fechaFinal).slice(0, 13) + ":"+ (fechaFinal).slice(13);

        var entrada = moment(fechaInicial,'YYYY.MM.DD HH:mm');
        var salida = moment(fechaFinal,'YYYY.MM.DD HH:mm');

        var resta = entrada.diff(salida, "minutes")
        
        resta=resta*(-1)
        
        console.log("resta", resta)
       
       var horas=resta/60
       
            console.log("horas", horas)
            console.log("cantidad", cantidad)

       var rendimiento= cantidad/horas
       
       rendimiento= rendimiento.toFixed(2)
       console.log("rendimiento", rendimiento)
       

       if((horas/10)<1){
             var Horas=horas.toString()
              Horas=Horas.substr(0,1)
       }else{
             var Horas=horas.toString()
              Horas=Horas.substr(0,2)
       }
     
       var a=Horas*60

       var restaMinutos=resta-a
       restaMinutos = restaMinutos.toString()
       rendimiento = rendimiento.toString()

       var vector=[Horas, restaMinutos, rendimiento]
       
       console.log(vector)

      return vector

    },


   getCadenaFecha(date){
        this.fecha=[];
        var cadena = date.toString();

        this.fecha.push(cadena.substr(11,4));
        this.fecha.push(cadena.substr(4,3));
        this.fecha.push(cadena.substr(8,2));
        this.fecha.push(cadena.substr(16,2));
        this.fecha.push(cadena.substr(19,2));

    //el mes aparece en letras (Nov, Dec... etc)
    //se cambia a numeros 
    //--------------------------------------
    switch (this.fecha[1]) {
    case "Jan":
        this.fecha[1] = "01";
        break;
    case "Feb":
        this.fecha[1] = "02";
        break;
    case "Mar":
        this.fecha[1] = "03";
        break;
    case "Apr":
        this.fecha[1] = "04";
        break;
    case "May":
        this.fecha[1] = "05";
        break;
    case "Jun":
        this.fecha[1] = "06";
        break;
    case "Jul":
        this.fecha[1] = "07";
        break;
    case "Aug":
        this.fecha[1] = "08";
        break;
    case "Sep":
        this.fecha[1] = "09";
        break;
    case "Oct":
        this.fecha[1] = "10";
        break;
    case "Nov":
        this.fecha[1] = "11";
        break;
    case "Dec":
        this.fecha[1] = "12";
        break;
    }
    //---------

    //despues de castiar el vector a string
    //hay que quitarle las comas
    cadena=this.fecha.toString()
    cadena = cadena.replace(',', '');
    cadena = cadena.replace(',', '');
    cadena = cadena.replace(',', '');
    cadena = cadena.replace(',', '');
    
    return cadena;
    },

    
   _getCadenaFecha(date){

        let dateString = date.toString()
      
        
        dateString = dateString.replace('.', '');
        dateString = dateString.replace('.', '');
        dateString = dateString.replace(' ', '');
        dateString = dateString.replace(':', '');
            
        console.log(dateString)
        console.log("-------------------")
        return dateString

   }

}

module.exports= conversion;