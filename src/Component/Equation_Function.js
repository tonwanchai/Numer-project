let equation_func = (x,f_x) => {
    let temp = eval(f_x)
    return temp;
}

let fixed_fx = (f_x) =>{
    f_x = f_x.replace("^","**");
    //f_x = f_x.replace(/X/g, '$&x');
    f_x = f_x.replaceAll("sin","Math.sin");
    f_x = f_x.replaceAll("cos","Math.cos");
    f_x = f_x.replaceAll("tan","Math.tan");
    f_x = f_x.replaceAll("sqrt","Math.sqrt");
    f_x = f_x.replace(/\d(?=x)/g, '$&*');

    while (f_x.indexOf("xx") >= 0)
    {
        f_x = f_x.replace("xx", "x*x"); 
    }

    return f_x;
}

export { equation_func, fixed_fx };

