const productsControllers= async ()=>{
    const resp = await fetch("/src/components/data/stock.json")
    const data = await resp.json()

    return data
};

