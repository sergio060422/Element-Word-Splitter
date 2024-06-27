let table, alpha = "qwertyuiopasdfghjklzxcvbnm";

function ft(){
    fetch("PeriodicTableJSON.json").then(ans => ans.json()).then(data => give(data));
}

function give(data){
    let txt = document.getElementById("txt");
    let bd = document.getElementById("bd");
    let showbox = document.createElement("div");
    showbox.className = "showbox";
    showbox.id = "1s";
    bd.appendChild(showbox);
    table = data;
    get();
    txt.addEventListener("input", set_text);  
}

let elements = [], names = [], cat = [], colors = ["#2A4165", "#623842", "#244D57", "#622E39", "#523E1B", "#2A4165", "#2F4D47", "#433C65", "#004A77", "#613B28", "#46474C"];

let assing = new Map(), catcolor = new Map(), mass = new Map(), num = new Map(), symb = new Map();
let p = 0;

function get(){
    for(let i = 0; i < 118; i++){
        let symbol = table["elements"][i]["symbol"];
        let name = table["elements"][i]["name"];
        let category = table["elements"][i]["category"] + "";
        let atomic_mass = table["elements"][i]["atomic_mass"];
        
        atomic_mass = atomic_mass.toPrecision(4);
        
        elements.push(symbol);
        names.push(name);
        mass[name] = atomic_mass;
        num[name] = i;
        symb[name] = symbol;

        if(category.includes("unknow")){
            category = "unknow";
        }
        
        if(!cat.includes(category)){
            cat.push(category);
            catcolor[category] = colors[p];
            p++;
        }
        
        assing[name] = catcolor[category];
    }
}

let memo = new Map();

function make(i, n, word, ans, v = []){
    if(i == n){
        return [1, ans, v];
    }
    else if(memo[[i, ans]] != undefined){
        return memo[[i, ans]];
    }
    else if(i == n - 1){
        let s = word[i];
        s = s.toUpperCase();
            
        if(elements.includes(s)){
            if(make(i + 1, n, word, ans + s, v)[0]){
                let p = elements.indexOf(s);
                
                v.push(names[p]);
                
                return memo[[i, ans]] = make(i + 1, n, word, ans + s, v);
            }
        }
    }
    else{
        let s1 = word[i];
        s1 = s1.toUpperCase();
        let s2 = s1;
        s2 += word[i + 1];
        
        if(elements.includes(s1)){
            if(make(i + 1, n, word, ans + s1, v)[0]){
                let p = elements.indexOf(s1);
                
                v.push(names[p]);             
                
                return memo[[i, ans]] = make(i + 1, n, word, ans + s1, v);
            }
        }
        if(elements.includes(s2)){
            if(make(i + 2, n, word, ans + s2, v)[0]){
                let p = elements.indexOf(s2);
                
                v.push(names[p]);
                
                return memo[[i, ans]] = make(i + 2, n, word, ans + s2, v);
            }
        }
    }
    
    return [0, ans, v];
}

let curr = 0;

function add_element(elmnt_name){
     let index = num[elmnt_name];
     let ebox = document.createElement("div");
     let place = document.getElementById("shb");
    
     ebox.className = "elmnt";
     ebox.id = curr + "";
     curr++;
     place.appendChild(ebox);
     
     let number = document.createElement("span");
     let symbol = document.createElement("span");
     let name = document.createElement("span");
     let atomic_mass = document.createElement("span");
    
     ebox.appendChild(number);
     ebox.appendChild(symbol);
     ebox.appendChild(name);
     ebox.appendChild(atomic_mass);
    
     number.className = "info";
     symbol.className = "info";
     name.className = "info";
     atomic_mass.className = "info";
    
     number.id = "number";
     symbol.id = "symbol";
     name.id = "name";
     atomic_mass.id = "mass";
    
     number.textContent = table["elements"][index]["number"];
     atomic_mass.textContent = mass[table["elements"][index]["name"]];
     symbol.textContent = table["elements"][index]["symbol"];
     name.textContent = table["elements"][index]["name"];
     ebox.style.backgroundColor = assing[table["elements"][index]["name"]];
}

function add_space(){
    let ebox = document.createElement("div");
    let place = document.getElementById("shb");
    
    ebox.className = "elmnt";
    place.appendChild(ebox);
    ebox.style.width = "50px";
    ebox.style.display = "inline-block";
    ebox.style.opacity = "0";
}

function letter(c){
    if(c.toLowerCase() != c.toUpperCase()){
        return 1;
    }
    return 0;
}

let lenp = 0;

function set_text(){
    let text_box = document.getElementById("txt");
    let text = text_box.value;
    let fixed = "", spaces = [], len = 0;
    console.log(text.length);
    for(let i = 0; i < text.length; i++){
        if(letter(text[i])){
            fixed += text[i];
            len++;
        }
        else{
            spaces.push(len);
        }
    }

    memo = new Map();
    let res = make(0, fixed.length, fixed, "", []);
    let showbox = document.getElementById("shb");

    if(res[0]){
        text_box.style.borderColor = "green";
        for(let i = showbox.childNodes.length - 1; i >= 0; i--){
            showbox.childNodes.item(i).remove();
        }
        let curr_len = 0;
        for(let i = res[2].length - 1; i >= 0; i--){
            if(spaces.includes(curr_len)){
                add_space();
            }
            curr_len += symb[res[2][i]].length;
            add_element(res[2][i]);
        }
        if(spaces.includes(curr_len)){
            add_space();
        }
        lenp = len;
    }
    else{
        text_box.style.borderColor = "red";
    }
    
}


window.addEventListener("load", ft);