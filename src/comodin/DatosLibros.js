export let idD=0;
export let nameD="";
export let authorD="";
export let pagesD=0;
export let yearD=0;

export const setLibro=(id,name,author,pages,year)=>{
    idD=parseInt(id);
    nameD=name;
    authorD=author;
    pagesD=parseInt(pages);
    yearD=parseInt(year);
} 

