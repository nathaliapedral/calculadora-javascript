
class CalcController{
    
    constructor(){
        this._operations = [0];
        this._lastNumber = '';
        this._lastOperator = '';
        this._locale;
        this._currentDate;     
        this._displayCalcEl = document.querySelector("#display");
        this._dateCalcEl = document.querySelector("#data");
        this._timeCalcEl = document.querySelector("#hora");
        this.initialize();
        this.initButtonsEvent();
        this.initKeyboard();


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

    initKeyboard(){

        document.addEventListener('keyup', e=>{
            console.log(e.key);
            this.execBtn(e.key);
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
            case '+':
                this.addOperation('+');
                break;
            case 'subtracao':
            case '-':
                this.addOperation('-');
                break;
            case 'multiplicacao':
            case '*':
                this.addOperation('*');
                break;
            case 'divisao':
            case '/':
                this.addOperation('/');
                break;
            case 'porcento':
            case '%':
                this.addOperation('%');
                break;
            case 'igual':
            case '=':
            case 'Enter':
                this.execEqual();
                break;
            case 'ponto':
            case ',':
            case '.':
                this.addDot('.');
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

    execEqual(){
        this.pushOperation('=');
        console.log(this._operations);
    }

    clearAll(){
        this._operations = [0];
        this._lastNumber = '';
        this._lastOperator = '';
        console.log(this._operations);
        this.updateDisplay(0);
    }

    clearEntry(){

        if (this.isOperator(this.getLastOperation())){
          this._operations.push(0);
        } else {
            this.setLastOperation(0);   
        }
        this.updateDisplay(0);
        console.log(this._operations);

    }

    addDot() {
        let lastOperation = this.getLastOperation();
        console.log(lastOperation);

        if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if (this.isOperator(lastOperation)){
            this._operations.push('0.');
        } else if (typeof lastOperation === 'number' && lastOperation !== 0){
            this.setLastOperation(lastOperation.toString()+'.');    
        } else if (typeof lastOperation === 'string'){
            this.setLastOperation(lastOperation+'.');
        } 
        else {
            this.setLastOperation('0.');
        }
        this.updateDisplay(this.getLastOperation());
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

    pushOperation(value){
        
        this._operations.push(value);

        if (this._operations.length > 3){
            let last = this._operations.pop();
            if (last === '='){
                this._operations = [this.calc(this._operations)];
                this._operations.push(last);
            } else if (last === '%'){
                this._operations = [this.calc(this._operations)/100];
            } else {
                this._operations = [this.calc(this._operations)];
                this._operations.push(last);

            }
        } else if (this.getLastOperation() === '=') {
            let last = this._operations.pop();
            if (this.isOperator(this.getLastOperation())){
                this._operations = [this.calc([this.getLastItem(false),this.getLastOperation(),this.getLastItem(false)])];
                this._operations.push(last);
            } else if (this.getLastOperation()==='='){
                //console.log('Ultimo item', this.getLastItem(false));
                this._operations = [this.calc([this.getLastItem(false),this._lastOperator,this._lastNumber])];
                this._operations.push(last);
            }
        }
        this.updateDisplay(this._operations[0]); 
    }

    updateDisplay(value){

        this.displayCalc = value;

    }



    getLastItem(isOperator = true){
        let lastItem = '';
        for (let i = this._operations.length; i > 0;i--){
            if (isOperator){
                if (this.isOperator(this._operations[i-1])){
                    lastItem = this._operations[i-1];
                    break;
                } 
           } else if (!isNaN(this._operations[i-1])){
                    console.log('Ultimo item é', this._operations[i-1]);
                    lastItem = this._operations[i-1];
                    break;
            } 
        }
        
        return lastItem;
    }

    calc(arr){
        let result = '';
        
        if(this.getLastItem(false)!== '' && this.getLastItem(true)!==''){
            this._lastNumber = this.getLastItem(false);
            this._lastOperator = this.getLastItem(true);
        }
        
       
        arr.forEach( el => {
            result += el.toString();
        });
        console.log(result)
        return Math.round(eval(result)*100000000)/100000000;
    }

    addOperation(value){
    
        if(isNaN(this.getLastOperation())) {
            if (this.isOperator(value)){
                this.setLastOperation(value);
            } else {
                this.pushOperation(value);
                this.updateDisplay(value);
            }      
        } else if (isNaN(value)){
            this.pushOperation(value);
        } else if(this.getLastOperation() === 0){
            this.setLastOperation(value);
            this.updateDisplay(value);
        } else{
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(newValue);
            this.updateDisplay(newValue);
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