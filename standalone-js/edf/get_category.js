let id = '123';

let setCategory = () => {
    let category = [
        {name: 'convio', format:/^[0-9]{4}$/},  // exactly 4, numbers only
        {name: 'p2a', format:/^[0-9]{5,}$/}     // 5 and up, numbers only
    ],

    cat = category.filter( (v, i) => {
        return category[i].name === id;
    });
    
    if(cat.length === 0){
        cat = category.filter( (v, i) => {
            if(category[i].format.test(id)){
                return category[i].name;
            }
        });
    }

    return cat.length !== 0 ? cat[0].name : 'edf';
}
