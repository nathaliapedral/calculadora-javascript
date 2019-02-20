
class CalcController{
    
    constructor(){
        this._locale;
        this._currentDate;     
        this._displayCalcEl = document.querySelector("#display");
        this._dateCalcEl = document.querySelector("#data");
        this._timeCalcEl = document.querySelector("#hora");
        this.initialize();
        this.initButtonsEvent();


    }

    initialize(){
        
        this.setDisplayDateTime();
        setInterval(()=>{
           this.setDisplayDateTime();
        },1000);

    }

    initButtonsEvent(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        
        /* para cada botão do array buttons será executado a arrow function
            com parâmetro btn representando cada elemento do array.
        */
        buttons.forEach( btn => {
            
            /* adicionando um evento de click para cada btn onde será executado
                uma arrow function indicando o que deve ser feito quando o botão for 
                clicado. 'ev' é o para parâmetro da function.
            */
            btn.addEventListener('click', ev => {
                console.log(btn);
            });
        });
    }

    setDisplayDateTime(){
        this.locale = 'pt-BR';
        this.displayDate = this.currentDate.toLocaleDateString(this.locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this.locale);
    }

    get displayDate(){
        return this._dateCalcEl.innerHTML;
    }

    set displayDate(dateCalcEl){
        this._dateCalcEl.innerHTML = dateCalcEl;
    }

    get displayTime(){
        return this._timeCalcEl.innerHTML;
    }

    set displayTime(timeCalcEl){
        this._timeCalcEl.innerHTML = timeCalcEl;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    
    set displayCalc(displayCalcEl){
        this._displayCalcEl.innerHTML = displayCalcEl;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(currentDate){
        this._currentDate = currentDate;
    }

    get locale(){
        return this._locale;
    }

    set locale(value){
        this._locale = value; 
    }
}