// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    let missionPrompt = document.querySelector("#missionTarget");
    
    let html = `<h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter} </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">`
    missionPrompt.innerHTML = html;
}

function validateInput(testInput) {
    let testNum = Number(testInput)
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testNum)) {
        return "Not a Number"
    } else if (isNaN(testNum) === false) {
        return "Is a Number"
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let validatePilot = validateInput(pilot);
    let validateCopilot = validateInput(copilot);
    let validateFuelLevel = validateInput(fuelLevel);
    let validateCargoLevel = validateInput(cargoLevel);
    if (validatePilot === "Empty" ||
        validateCopilot === "Empty" ||
        validateFuelLevel === "Empty" ||
        validateCargoLevel === "Empty") {
        alert("All fields are required")
        return false
    } else if (validateFuelLevel !== "Is a Number" || validateCargoLevel !== "Is a Number" || validatePilot !== "Not a Number" || validateCopilot !== "Not a Number") {
        alert("Invalid Input")
        return false
    }

    if (Number(fuelLevel) < 10000) {
        let fuelPrompt = document.querySelector("#fuelStatus");
        fuelPrompt.textContent = "Fuel level too low for launch";
    } else {
        let fuelPrompt = document.querySelector("#fuelStatus");
        fuelPrompt.textContent = "Fuel level high enough for launch";
    }
    if (Number(cargoLevel) > 10000) {
        let cargoPrompt = document.querySelector("#cargoStatus");
        cargoPrompt.textContent = "Cargo mass too heavy for launch";
    } else {
        let cargoPrompt = document.querySelector("#cargoStatus");
        cargoPrompt.textContent = "Cargo mass low enough for launch";
    }
    list.style.visibility = "visible";
    let pilotPrompt = document.querySelector("#pilotStatus");
    pilotPrompt.textContent = `Pilot ${pilot} is ready for launch`;
    let copilotPrompt = document.querySelector("#copilotStatus");
    copilotPrompt.textContent = `Co-pilot ${copilot} is ready for launch`;
    let fuelPrompt = document.querySelector("#fuelStatus");
    let cargoPrompt = document.querySelector("#cargoStatus");
    let launchPrompt = document.querySelector("#launchStatus");
    if (fuelPrompt.textContent === "Fuel level too low for launch" || cargoPrompt.textContent === "Cargo mass too heavy for launch") {

        launchPrompt.textContent = "Shuttle Not Ready for Launch"
        launchPrompt.style.color = "rgb(199, 37, 78)"
        return false
    } else {
        launchPrompt.textContent = "Shuttle is ready for launch"
        launchPrompt.style.color = "green"
    }
    return true
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")//.then(function (response) {
    //});

    return planetsReturned.json();
}

function pickPlanet(planets) {
    let random = Math.floor(Math.random() * (planets.length))
    return planets[random];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
