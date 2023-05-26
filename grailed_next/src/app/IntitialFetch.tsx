
//come back to this
async function getIntitialData() {
    const res = await fetch('http://localhost:4000/recent', {cache: 'no-cache'})
    
    return res.json();
}

export default getIntitialData;