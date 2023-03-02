const loadAllData = () => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools'
    fetch(url)
    .then(res => res.json())
    .then(data => DisplayAllData(data.data.tools))
}
const DisplayAllData = services => {
    const parentElement = document.getElementById('parent-container');
    services.forEach(service => {
        // console.log(service.id);
        const dynamicElement = document.createElement('div');
        dynamicElement.classList.add('col');
        dynamicElement.innerHTML = `
        <div class="card h-100">
        <img src="${service.image}" class="card-img-top h-100 w-auto" alt="...">
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <p class="card-text">1. ${service.features[0]}</p>
            <p class="card-text">2. ${service.features[1]}</p>
            <p class="card-text">3. ${service.features[2]}</p>
            <hr>
            <div class="d-flex justify-content-between align-items-center">
            <div>
            <h5 class="card-title">${service.name}</h5>
            <p class="card-text"><i class="fa-solid fa-calendar-days"></i> ${service.published_in}</p>
            </div>
            <div>
            <button onclick="individualData('${service.id}')" type="button" class="modal-button" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
            </div>
            </div>
        </div>
        </div>
        `;
        parentElement.appendChild(dynamicElement);
    })
}
// modal area 
const individualData = id => {
    console.log(id)
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => individualDataDisplay(data.data))
}
const individualDataDisplay = data => {
    console.log(data);
    document.getElementById('modal-right-img').setAttribute('src', data.image_link[0])
}
loadAllData();