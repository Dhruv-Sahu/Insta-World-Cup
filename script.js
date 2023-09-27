async function getMatchData() {
    var matchTypeDropdown = document.getElementById("matchType");
    var selectedMatchType = matchTypeDropdown.value;

    try {
        const response = await fetch("https://api.cricapi.com/v1/currentMatches?apikey=58f9ba56-7a8f-4001-9a86-f9c3946f443e&offset=0");
        const data = await response.json();
        // console.log(data)
        // console.log(data.data[0].teamInfo[0].img)

        if (data.status !== "success" || !data.data) {
            // Handle API error or no data
            document.getElementById("matches").innerHTML = "<li>No relevant matches found</li>";
            return;
        }

        const matchesList = data.data;
        const relevantData = matchesList.filter(match => match.matchType == selectedMatchType).map(match => `${match.name}, ${match.status}`);

        if (relevantData.length === 0) {
            document.getElementById("matches").innerHTML = "<li>No relevant matches found</li>";
            return;
        }

        document.getElementById("matches").innerHTML = relevantData.map(match => `<li>${match}</li>`).join('');
    } catch (e) {
        console.log(e);
        // Handle other errors here, if necessary
        document.getElementById("matches").innerHTML = `<li>${e}</li>`;

    }
}

// Assuming you have a button with the ID "myButton"
var myButton = document.getElementById("myButton");

myButton.addEventListener("click", function () {
    getMatchData();
});
