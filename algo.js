let table;

function ft(){
    fetch("PeriodicTableJSON.json").then(ans => ans.json()).then(data => give(data));
}

function give(data){
    let gb = document.getElementById("get");
    table = data;
    get();
    gb.addEventListener("click", get_text);
}

let elements = [], names = [], cat = [], colors = ["#2A4165", "#623842", "#244D57", "#622E39", "#523E1B", "#2A4165", "#2F4D47", "#433C65", "#004A77", "#613B28", "#46474C"];

let assing = new Map(), catcolor = new Map(), mass = new Map(), num = new Map();
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

let map = new Map();

function make(i, n, word, ans, v = []){
    if(i == n){
        return [1, ans, v];
    }
    if(map[[i, ans]] != undefined){
        return map[[i, ans]];
    }
    else if(i == n - 1){
        let s = word[i];
        s = s.toUpperCase();
            
        if(elements.includes(s)){
            if(make(i + 1, n, word, ans + s, v)[0]){
                let p = elements.indexOf(s);
                
                v.push(names[p]);
                
                return map[[i, ans]] = make(i + 1, n, word, ans + s, v);
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
                
                return map[[i, ans]] = make(i + 1, n, word, ans + s1, v);
            }
        }
        if(elements.includes(s2)){
            if(make(i + 2, n, word, ans + s2, v)[0]){
                let p = elements.indexOf(s2);
                
                v.push(names[p]);
                
                return map[[i, ans]] = make(i + 2, n, word, ans + s2, v);
            }
        }
    }
    return [0, "", v];
}

let curr = 0;

function add_element(elmnt_name){
     let index = num[elmnt_name];
     let ebox = document.createElement("div");
     let place = document.getElementById("bd");
    
     ebox.className = "elmnt";
     ebox.id = index;
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


function change(){
    let number = document.getElementById("number");
    let symbol = document.getElementById("symbol");
    let name = document.getElementById("name");
    let ebox = document.getElementById("ebox");
    let atomic_mass = document.getElementById("mass");
    
    curr++;
    if(curr >= 118){
        curr = 0;
    }
    
    number.textContent = table["elements"][curr]["number"];
    atomic_mass.textContent = mass[table["elements"][curr]["name"]];
    symbol.textContent = table["elements"][curr]["symbol"];
    name.textContent = table["elements"][curr]["name"];
    ebox.style.backgroundColor = assing[table["elements"][curr]["name"]];

}

function get_text(){
    let textarea = document.getElementById("txt");
    let text = textarea.value;
    let ans = make(0, text.length + "", text, "", []);

    for(let i = ans[2].length - 1; i >= 0; i--){
        add_element(ans[2][i]);
    }

    
}

window.addEventListener("load", ft);
window.addEventListener("load", get_text);
