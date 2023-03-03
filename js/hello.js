const spinner = document.getElementById('spinner');
const loadAllData = dataLimit => {
    spinner.classList.remove('d-none');
    const url = 'https://openapi.programming-hero.com/api/ai/tools'
    fetch(url)
    .then(res => res.json())
    .then(data => DisplayAllData(data.data.tools, dataLimit))
}
const DisplayAllData = (services, dataLimit) => {
    const parentElement = document.getElementById('parent-container');
    parentElement.innerHTML = '';
    const showMoreButton = document.getElementById('show-more-btn');
    if(dataLimit){
        services = services.slice(0, 6);
        showMoreButton.classList.remove('d-none')
    }
    else{
        showMoreButton.classList.add('d-none')
    }
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
        spinner.classList.add('d-none');
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
    // console.log(data.pricing[0].plan);
    // modal right side 
    // modal image 
    document.getElementById('modal-right-img').setAttribute('src', data.image_link[0]);
    document.getElementById('modal').innerText = data.input_output_examples ? data.input_output_examples[0].input : 'Can you give any example?';
    document.getElementById('modal-right-p').innerText = data.input_output_examples ? data.input_output_examples[0].output : 'No! Not Yet! Take a break!!!';

    // modal left side 
    document.getElementById('modal-card-top').innerText = data.description;

    // plan and pricing
    document.getElementById('plan-1').innerText = data.pricing ? data.pricing[0].price : 'free of cost';
    document.getElementById('plan-1-ex').innerText = data.pricing ? data.pricing[0].plan : 'Basic';
    document.getElementById('plan-2').innerText = data.pricing ? data.pricing[1].price : 'free of cost';
    document.getElementById('plan-2-ex').innerText = data.pricing ? data.pricing[1].plan : 'Pro';
    document.getElementById('plan-3').innerText = data.pricing ? data.pricing[2].price : 'free of cost';
    document.getElementById('plan-3-ex').innerText = data.pricing ? data.pricing[2].plan : 'Enterprise';
    
    // features 
    document.getElementById('card-list-left-1').innerText = data.features['1'].feature_name;
    document.getElementById('card-list-left-2').innerText = data.features['2'].feature_name;
    document.getElementById('card-list-left-3').innerText = data.features['3'].feature_name;

    // integrations 
    document.getElementById('card-list-right-1').innerText = data.integrations ? data.integrations[0] : 'No data Found';
    document.getElementById('card-list-right-2').innerText = data.integrations ? data.integrations[1] : 'No data Found';
    document.getElementById('card-list-right-3').innerText = data.integrations ? data.integrations[2] : 'No data Found';

    // accuracy
    const accuracySpan = document.getElementById('accuracy');
    const accuracyButton = document.getElementById('accuracy-button');
    if(data.accuracy.score){
        accuracySpan.innerText = data.accuracy.score;
        accuracyButton.classList.remove('d-none');
    }
    else{
        accuracyButton.classList.add('d-none');
    }
    
}
loadAllData(6);