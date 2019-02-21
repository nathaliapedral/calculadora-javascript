
class CalcController{
    
    constructor(){
        this._operations = [0];
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
            this.addEventListenerAll(btn, 'click,drag', () => {
                let txtBtn = btn.className.baseVal.replace('btn-','');
                this.execBtn(txtBtn);
            });

            this.addEventListenerAll(btn, 'mouseover,mousedown,mousedown', () => {
                btn.style.cursor = 'pointer';
            });
        });
    }

    execBtn(value){

        switch (value){
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                //todo
                break;
            case 'ponto':
                this.addOperation('.');
                break;
            
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.displayCalc = 'Error';
        }

    }

    clearAll(){
        this._operations = [0];
        console.log(this._operations);
    }

    clearEntry(){
        this._operations.pop();
        console.log(this._operations);

    }

    getLastOperation(){
        return this._operations[this._operations.length -1];
    }

    isOperator(value){
        let arr = ['+','-','*','/','%'];
        return (arr.indexOf(value) !== -1);
          
    }

    setLastOperation(value){
        this._operations[this._operations.length-1] = value;
    }

    addOperation(value){
    
        if(isNaN(this.getLastOperation())) {
            if (this.isOperator(value)){
                this.setLastOperation(value);
            } else {
                this._operations.push(value);
            }      
        } else if (isNaN(value)){
            this._operations.push(value);
        } else if(this.getLastOperation() === 0){
            this.setLastOperation(value);
        } else{
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue));
        }

    console.log(this._operations); 
    }
             

    /* Adiciona um listener ao elemento (element) para cada evento passado por 
        parâmetro(events) */
    addEventListenerAll (element, events, func){

        //Separa pela vírgula a string events em um array de strings
        events.split(',').forEach( event => {
            element.addEventListener(event, func);
        })
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