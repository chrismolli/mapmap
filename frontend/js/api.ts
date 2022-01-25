const base_url = "http://localhost:5000"

async function getEntries(){
    let url = base_url + "/getEntries";
    let response = await fetch(url);
    return response.json();
}