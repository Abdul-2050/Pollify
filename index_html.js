import config from "./config.js"; // Adjust the path as needed

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();
// Initialize Firebase Authentication
const auth = firebase.auth();

function createMatch(matchData, matchIndex) {
  const uniqueId = `${matchIndex}_${matchData.team1
    .replace(/ /g, "-")
    .toLowerCase()}_${matchData.team2.replace(/ /g, "-").toLowerCase()}`;
  const matchDiv = document.createElement("div");
  matchDiv.className = "match";
  matchDiv.style.marginBottom = "10px";

  matchDiv.innerHTML = `<div class="discription">

<div class="teamsname">
<p style="margin-left: 6px; margin-top: 0;">${matchData.description}</p>
</div>
<div class="date">
<p>${matchData.matchDate}</p>
</div>
<div class="match-live" style="display: none; color: greenyellow;" >
. live
</div>
</div>

<label for="team1_${uniqueId}">
<div class="first_team" style="margin-bottom: 5px;">
<div class="first_team_container1">
<div class="flag_section">
<input type="radio" name="match_${uniqueId}" id="team1_${uniqueId}">
<label for="team1_${uniqueId}"><img src="${matchData.team1
    .replace(/ /g, "-")
    .toLowerCase()}.png" alt=""
        style="width: 25px;"></label>
</div>
<!--  This is for how many persons -->
<span class="members" data-match-index="" data-team="team1">0</span>
</div>



<div class="first_team_container2">
<div style="min-width: 55px;"></div>
<progress class="first_team_progress progress progress1" max="100" value="0"
id="progress_${matchIndex}_team1"></progress>
</div>


</div>
</label>


<label for="team2_${uniqueId}">
<div class="first_team">
<div class="first_team_container1">
<div class="flag_section">
<input type="radio" name="match_${uniqueId}" id="team2_${uniqueId}">
<label for="team2_${uniqueId}"><img src="${matchData.team2
    .replace(/ /g, "-")
    .toLowerCase()}.png" alt=""
        style="width: 25px;"></label>
</div>
<!--  This is for how many persons -->
<span class="members" data-match-index="" data-team="team2">0</span>
</div>
<div class="first_team_container2">
<div style="min-width: 55px;"></div>
<progress class="first_team_progress progress progress1" max="100" value="0"
id="progress_${matchIndex}_team2"></progress>
</div>
</div>
</label>
<div class="matchinfo" style="border: 1px solid re;">
<div class="gap" style="border: 1px solid re;"></div>
<div class="matchinfo_container" style="border: 1px solid yello;">
<div>
<p>Starts at: ${getLocalizedTime(matchData)}</p>
</div>
<div class="results">
<p class="seeResultsBtn" style="
    color: #56b6ff; font-size: 12px; cursor:pointer;">results</p>
</div>
</div>
</div>




`;

  /// Add data attributes for match index and team to the vote count spans
  const team1VoteCountSpan = matchDiv.querySelector(
    '.members[data-team="team1"]'
  );
  const team2VoteCountSpan = matchDiv.querySelector(
    '.members[data-team="team2"]'
  );

  if (team1VoteCountSpan) {
    team1VoteCountSpan.dataset.matchIndex = matchIndex;
  }

  if (team2VoteCountSpan) {
    team2VoteCountSpan.dataset.matchIndex = matchIndex;
  }

  return matchDiv;
}

// Function to create a localized time string
function getLocalizedTime(matchData) {
  const matchDateTime = luxon.DateTime.fromFormat(
    `${matchData.matchDate} ${matchData.matchTime}`,
    "d-MMM h:mm a",
    { zone: "Asia/Kolkata" } // Indian Standard Time (IST)
  );

  const localMatchDateTime = matchDateTime.toLocal();
  return localMatchDateTime.toFormat("h:mm a");
}

// Function to create a countdown timer string
// function getCountdownTime(matchData) {
//     const now = luxon.DateTime.local();
//     const matchDateTime = luxon.DateTime.fromFormat(matchData.matchDate + " " + matchData.matchTime, "d-MMM h:mm a", { zone: matchData.timeZone });
//     const timeDifference = matchDateTime.diff(now, ['months', 'days', 'hours', 'minutes']);

//     const months = timeDifference.months;
//     const days = timeDifference.days;
//     const hours = timeDifference.hours;
//     const minutes = timeDifference.minutes;

//     if (months > 0) {
//         return `${months} months, ${days} days, ${hours} hours`;
//     } else if (days > 0) {
//         return `${days} days, ${hours} hours`;
//     } else if (hours > 1) {
//         return `${hours} hours`;
//     } else if (hours === 1) {
//         return `${hours} hour, ${minutes} minutes`;
//     } else {
//         return `${minutes} minutes`;
//     }
// }

// JavaScript code to create and display .match elements with descriptions and flags from the table
const matchesContainer = document.getElementById("matchesContainer");

const publicMatchDataArrayRef = database.ref(`public`);
let matchDataArray = [
  {
    description: "England vs New Zealand",
    team1: "England",
    team2: "New Zealand",
    matchDate: "5-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "Pakistan vs Netherlands",
    team1: "Pakistan",
    team2: "Netherlands",
    matchDate: "6-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "Bangladesh vs Afghanistan",
    team1: "Bangladesh",
    team2: "Afghanistan",
    matchDate: "7-Oct",
    matchTime: "10:30 AM",
    winningTeam: null,
  },
  {
    description: "South Africa vs Sri Lanka",
    team1: "South Africa",
    team2: "Sri Lanka",
    matchDate: "7-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "Australia vs India",
    team1: "Australia",
    team2: "India",
    matchDate: "8-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "New Zealand vs Netherlands",
    team1: "New Zealand",
    team2: "Netherlands",
    matchDate: "9-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "England vs Bangladesh",
    team1: "England",
    team2: "Bangladesh",
    matchDate: "10-Oct",
    matchTime: "10:30 AM",
    winningTeam: null,
  },
  {
    description: "Pakistan vs Sri Lanka",
    team1: "Pakistan",
    team2: "Sri Lanka",
    matchDate: "10-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "India vs Afghanistan",
    team1: "India",
    team2: "Afghanistan",
    matchDate: "11-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "Australia vs South Africa",
    team1: "Australia",
    team2: "South Africa",
    matchDate: "12-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "New Zealand vs Bangladesh",
    team1: "New Zealand",
    team2: "Bangladesh",
    matchDate: "13-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "India vs Pakistan",
    team1: "India",
    team2: "Pakistan",
    matchDate: "14-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "England vs Afghanistan",
    team1: "England",
    team2: "Afghanistan",
    matchDate: "15-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "Australia vs Sri Lanka",
    team1: "Australia",
    team2: "Sri Lanka",
    matchDate: "16-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "South Africa vs Netherlands",
    team1: "South Africa",
    team2: "Netherlands",
    matchDate: "17-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "New Zealand vs Afghanistan",
    team1: "New Zealand",
    team2: "Afghanistan",
    matchDate: "18-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "India vs Bangladesh",
    team1: "India",
    team2: "Bangladesh",
    matchDate: "19-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "Australia vs Pakistan",
    team1: "Australia",
    team2: "Pakistan",
    matchDate: "20-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "Netherlands vs Sri Lanka",
    team1: "Netherlands",
    team2: "Sri Lanka",
    matchDate: "21-Oct",
    matchTime: "10:30 AM",
    winningTeam: null,
  },
  {
    description: "England vs South Africa",
    team1: "England",
    team2: "South Africa",
    matchDate: "21-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "India vs New Zealand",
    team1: "India",
    team2: "New Zealand",
    matchDate: "22-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "Pakistan vs Afghanistan",
    team1: "Pakistan",
    team2: "Afghanistan",
    matchDate: "23-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "South Africa vs Bangladesh",
    team1: "South Africa",
    team2: "Bangladesh",
    matchDate: "24-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "Australia vs Netherlands",
    team1: "Australia",
    team2: "Netherlands",
    matchDate: "25-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "England vs Sri Lanka",
    team1: "England",
    team2: "Sri Lanka",
    matchDate: "26-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "Pakistan vs South Africa",
    team1: "Pakistan",
    team2: "South Africa",
    matchDate: "27-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "Australia vs New Zealand",
    team1: "Australia",
    team2: "New Zealand",
    matchDate: "28-Oct",
    matchTime: "10:30 AM",
    winningTeam: null,
  },
  {
    description: "Netherlands vs Bangladesh",
    team1: "Netherlands",
    team2: "Bangladesh",
    matchDate: "28-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "India vs England",
    team1: "India",
    team2: "England",
    matchDate: "29-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "Afghanistan vs Sri Lanka",
    team1: "Afghanistan",
    team2: "Sri Lanka",
    matchDate: "30-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "Pakistan vs Bangladesh",
    team1: "Pakistan",
    team2: "Bangladesh",
    matchDate: "31-Oct",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "New Zealand vs South Africa",
    team1: "New Zealand",
    team2: "South Africa",
    matchDate: "1-Nov",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "India vs Sri Lanka",
    team1: "India",
    team2: "Sri Lanka",
    matchDate: "2-Nov",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "Netherlands vs Afghanistan",
    team1: "Netherlands",
    team2: "Afghanistan",
    matchDate: "3-Nov",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "New Zealand vs Pakistan",
    team1: "New Zealand",
    team2: "Pakistan",
    matchDate: "4-Nov",
    matchTime: "10:30 AM",
    winningTeam: null,
  },
  {
    description: "England vs Australia",
    team1: "England",
    team2: "Australia",
    matchDate: "4-Nov",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "India vs South Africa",
    team1: "India",
    team2: "South Africa",
    matchDate: "5-Nov",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "Bangladesh vs Sri Lanka",
    team1: "Bangladesh",
    team2: "Sri Lanka",
    matchDate: "6-Nov",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "Australia vs Afghanistan",
    team1: "Australia",
    team2: "Afghanistan",
    matchDate: "7-Nov",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "England vs Netherlands",
    team1: "England",
    team2: "Netherlands",
    matchDate: "8-Nov",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "New Zealand vs Sri Lanka",
    team1: "New Zealand",
    team2: "Sri Lanka",
    matchDate: "9-Nov",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "South Africa vs Afghanistan",
    team1: "South Africa",
    team2: "Afghanistan",
    matchDate: "10-Nov",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "Australia vs Bangladesh",
    team1: "Australia",
    team2: "Bangladesh",
    matchDate: "11-Nov",
    matchTime: "10:30 AM",
    winningTeam: null,
  },
  {
    description: "England vs Pakistan",
    team1: "England",
    team2: "Pakistan",
    matchDate: "11-Nov",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "India vs Netherlands",
    team1: "India",
    team2: "Netherlands",
    matchDate: "12-Nov",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "1st Semi-Final T.B.C. vs T.B.C.",
    team1: "T.B.C",
    team2: "T.B.C",
    matchDate: "15-Nov",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "2nd Semi-Final T.B.C. vs T.B.C.",
    team1: "T.B.C",
    team2: "T.B.C",
    matchDate: "16-Nov",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
  {
    description: "Final T.B.C. vs T.B.C.",
    team1: "T.B.C",
    team2: "T.B.C",
    matchDate: "19-Nov",
    matchTime: "2:00 PM",
    winningTeam: null,
  },
];

console.log(matchDataArray.length);


// Get the current date and time
const currentDate = new Date();

// Get the current year
const currentYear = currentDate.getFullYear();

// Sort the matchDataArray based on the match date
matchDataArray.sort((a, b) => {
  // Parse the match date and time, including the current year
  const dateA = new Date(`${currentYear}-${a.matchDate} ${a.matchTime}`);
  const dateB = new Date(`${currentYear}-${b.matchDate} ${b.matchTime}`);

  // Compare the dates
  if (dateA < currentDate && dateB < currentDate) {
    return 0; // If both are in the past, keep their relative order
  } else if (dateA < currentDate) {
    return 1; // Move match A with a past date to the end
  } else if (dateB < currentDate) {
    return -1; // Move match B with a past date to the end
  } else {
    return dateA - dateB; // Keep future matches in chronological order
  }
});

// Now, matchDataArray is sorted with future matches first and past matches at the end.

for (let i = 0; i < matchDataArray.length; i++) {
  const matchDiv = createMatch(matchDataArray[i], i);
  matchesContainer.appendChild(matchDiv);
}

// for (let i = 0; i < matchDataArray.length; i++) {
//   const matchDiv = createMatch(matchDataArray[i], i);
//   matchesContainer.appendChild(matchDiv);
// }

// Get the group key from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
var adminUid = urlParams.get("groupKey"); // Make sure you pass the groupKey as a parameter when redirecting
// console.log(adminUid);

// Keep track of selected options and their progress bars for each match
const selectedOptions = {};

// Add event listeners to radio buttons to update selected options and progress bars
const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    const selectedTeam = event.target.getAttribute("id").split("_")[0];
    const matchIndex = parseInt(
      event.target.getAttribute("name").split("_")[1]
    );

    // Get current user info
    const user = auth.currentUser;
    if (user) {
      // Update selected options for the specific match
      if (!selectedOptions[matchIndex]) {
        selectedOptions[matchIndex] = {};
      }

      for (const option in selectedOptions[matchIndex]) {
        selectedOptions[matchIndex][option] = false;
      }
      selectedOptions[matchIndex][selectedTeam] = true;

      // Update progress bars for the specific match based on selected options
      for (const option in selectedOptions[matchIndex]) {
        const progressElement = document.getElementById(
          `progress_${matchIndex}_${option}`
        );
        if (progressElement) {
          progressElement.value = selectedOptions[matchIndex][option] ? 100 : 0;
        }
      }

      // Save timestamp when selection was made
      const selectionTime = new Date().toISOString();

      // Print all the details
      // console.log(`Selected team: ${selectedTeam}`);
      // console.log(`Match description: ${matchDataArray[matchIndex].description}`);
      // console.log(`Match index: ${matchIndex}`);
      // console.log(`User UID: ${user.uid}`);
      // console.log(`Selection Time: ${selectionTime}`);

      /// Get the group key from the URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const groupKey = urlParams.get("groupKey"); // Make sure you pass the groupKey as a parameter when redirecting

      // Save the selected data in the database under the 'groups' structure
      // database.ref(`Admin/${user.uid}/groups/${groupKey}/matchProgress/${matchIndex}`).set({
      //     [selectedTeam]: selectedOptions[matchIndex][selectedTeam],
      //     selectionTime
      // });

      checkVoteTimeOut(matchDataArray[matchIndex]);

      database
        .ref(
          `Admin/${adminUid}/groups/groupMembers/${user.uid}/matchProgress/${matchIndex}`
        )
        .set({
          [selectedTeam]: selectedOptions[matchIndex][selectedTeam],
          selectionTime,
        });

      // Loop through all matches and teams to count votes
      for (
        let matchIndex = 0;
        matchIndex < matchDataArray.length;
        matchIndex++
      ) {
        countVotesForMatchAndTeam(adminUid, matchIndex, "team1");
        countVotesForMatchAndTeam(adminUid, matchIndex, "team2");
      }

      // Update the vote count display for the selected team in the corresponding match
      updateVoteCount(adminUid, matchIndex, selectedTeam);
    } else {
      console.log("User not authenticated.");
    }
  });
});

// JavaScript to control the loading animation

// Function to start the loading animation
function startLoading() {
  const loadingContainer = document.getElementById("loading-container");
  loadingContainer.style.display = "flex";
}

// Function to end the loading animation
function endLoading() {
  const loadingContainer = document.getElementById("loading-container");
  loadingContainer.style.display = "none";
}

// Get current user info
auth.onAuthStateChanged((user) => {
  if (user) {
    //start the loading
    startLoading();

    // Call the function to fetch and initialize matchDataArray
    // fetchMatchDataFromDatabase();

    // updateMatchStatus(matchDataArray);

    const publicMatchDataArrayRef = database.ref(`public`);

    publicMatchDataArrayRef
      .once("value")
      .then((snapshot) => {
        // Retrieve the data from the database
        const databaseMatchDataArray = snapshot.val();

        if (Array.isArray(databaseMatchDataArray)) {
          // Iterate through the database data to format the fields
          const formattedMatchDataArray = databaseMatchDataArray.map(
            (match) => ({
              description: match.description,
              team1: match.team1,
              team2: match.team2,
              matchDate: match.matchDate,
              matchTime: match.matchTime,
              winningTeam: match.winningTeam, // Assuming it's already a string
            })
          );

          // console.log("Data assigned");
          // console.log("fetch function ", matchDataArray);

          // Call the function that depends on matchDataArray
          // Replace this with your actual function call

          if (databaseMatchDataArray) {
            // Assign the formatted data to matchDataArray
            matchDataArray = formattedMatchDataArray;
            

            console.log(matchDataArray);

            if (adminUid != null) {
              console.log("user uid is not null");

              // User is authenticated, retrieve match progress data from the database and update progress bars
              const groupRef = database.ref(
                `Admin/${adminUid}/groups/groupMembers/${user.uid}/matchProgress`
              );
              const createdByNameElement = document.getElementById("createdBy");
              const adminNameRef = database.ref(`Admin/${adminUid}/userName`);

              // console.log("Admin uid " + adminUid);

              // console.log("Member uid " + user.uid);
              addMemberToAdmin(adminUid, user.uid);

              // check if the admin exits
              const adminRef = database.ref(`Admin/${adminUid}`);
              adminRef.on(
                "value",
                (snapshot) => {
                  if (snapshot.exists) {
                    // User is a member of the group
                  } else {
                    alert("This group doesn't exits.");
                    // Handle not being a member
                    const redirectURL = `authentication.html`;
                    window.location.href = redirectURL;
                  }
                },
                (error) => {
                  // Handle errors
                  console.error(
                    "Admin Error checking group membership:",
                    error
                  );
                }
              );

              // Listen for changes to match progress data for all members
              const allMembersRef = database.ref(
                `Admin/${adminUid}/groups/groupMembers`
              );
              allMembersRef.on("value", (snapshot) => {
                // Initialize an array to keep track of team votes for each match
                const matchTeamVotes = new Array(matchDataArray.length).fill({
                  team1: 0,
                  team2: 0,
                });

                snapshot.forEach((memberSnapshot) => {
                  const matchProgressData = memberSnapshot
                    .child("matchProgress")
                    .val();

                  if (matchProgressData) {
                    for (let i = 0; i < matchDataArray.length; i++) {
                      const matchIndex = i;

                      // Count the votes for each team for this match
                      let team1Votes = 0;
                      let team2Votes = 0;

                      for (const option in matchProgressData[matchIndex]) {
                        if (matchProgressData[matchIndex][option] === true) {
                          if (option === "team1") {
                            team1Votes++;
                          } else if (option === "team2") {
                            team2Votes++;
                          }
                        }
                      }

                      // Update the array with team votes for this match
                      matchTeamVotes[matchIndex] = {
                        team1: matchTeamVotes[matchIndex].team1 + team1Votes,
                        team2: matchTeamVotes[matchIndex].team2 + team2Votes,
                      };
                    }
                  }
                });

                // Iterate over the match data and update the progress bars
                for (
                  let matchIndex = 0;
                  matchIndex < matchDataArray.length;
                  matchIndex++
                ) {
                  const team1Votes = matchTeamVotes[matchIndex].team1;
                  const team2Votes = matchTeamVotes[matchIndex].team2;

                  // Calculate the total number of votes
                  const totalVotes = team1Votes + team2Votes;

                  // Calculate the percentages for each team
                  let team1Percentage = 0;
                  let team2Percentage = 0;

                  if (totalVotes > 0) {
                    team1Percentage = (team1Votes / totalVotes) * 100;
                    team2Percentage = (team2Votes / totalVotes) * 100;
                  }

                  // Update progress bars based on the calculated percentages
                  const progressElementTeam1 = document.getElementById(
                    `progress_${matchIndex}_team1`
                  );
                  const progressElementTeam2 = document.getElementById(
                    `progress_${matchIndex}_team2`
                  );

                  if (progressElementTeam1 && progressElementTeam2) {
                    progressElementTeam1.value = team1Percentage;
                    progressElementTeam2.value = team2Percentage;
                  }

                  // Update vote count display for both teams
                  updateVoteCount(adminUid, matchIndex, "team1");
                  updateVoteCount(adminUid, matchIndex, "team2");
                }
              });

              // Listen for changes to match progress data
              groupRef.on("value", (snapshot) => {
                const matchProgressData = snapshot.val();
                if (matchProgressData) {
                  // Update selected options and progress bars based on retrieved match progress data
                  for (let i = 0; i < matchDataArray.length; i++) {
                    const matchIndex = i;
                    for (const option in matchProgressData[matchIndex]) {
                      const progressElement = document.getElementById(
                        `progress_${matchIndex}_${option}`
                      );
                      if (progressElement) {
                        // Update selectedOptions object
                        selectedOptions[matchIndex] =
                          selectedOptions[matchIndex] || {};
                        selectedOptions[matchIndex][option] =
                          matchProgressData[matchIndex][option];

                        // Update progress bars based on selectedOptions
                        progressElement.value = selectedOptions[matchIndex][
                          option
                        ]
                          ? 100
                          : 0;
                      }
                    }

                    // Update vote count display for both teams
                    updateVoteCount(adminUid, matchIndex, "team1");
                    updateVoteCount(adminUid, matchIndex, "team2");
                  }
                }
              });

              groupRef.once("value", (snapshot) => {
                const matchProgressData = snapshot.val();
                if (matchProgressData) {
                  // console.log("matchProgressData:", matchProgressData);
                  for (let i = 0; i < matchDataArray.length; i++) {
                    const matchIndex = i;
                    const userSelections = matchProgressData[matchIndex];

                    if (userSelections) {
                      const team1Selection = userSelections.team1;
                      const team2Selection = userSelections.team2;

                      if (team1Selection) {
                        const selectedRadioButton = document.getElementById(
                          `team1_${matchIndex}_${matchDataArray[
                            matchIndex
                          ].team1
                            .replace(/ /g, "-")
                            .toLowerCase()}_${matchDataArray[matchIndex].team2
                            .replace(/ /g, "-")
                            .toLowerCase()}`
                        );
                        if (selectedRadioButton) {
                          selectedRadioButton.checked = true;
                        }
                      } else if (team2Selection) {
                        const selectedRadioButton = document.getElementById(
                          `team2_${matchIndex}_${matchDataArray[
                            matchIndex
                          ].team1
                            .replace(/ /g, "-")
                            .toLowerCase()}_${matchDataArray[matchIndex].team2
                            .replace(/ /g, "-")
                            .toLowerCase()}`
                        );
                        if (selectedRadioButton) {
                          selectedRadioButton.checked = true;
                        }
                      }
                    }
                  }
                }
              });

              adminNameRef.once("value", (snapshot) => {
                const userName = snapshot.val(); // Fetch the user's name
                if (userName) {
                  createdByNameElement.textContent =
                    "Group created by: " + userName;
                } else {
                  console.log("User's name not found.");
                }
              });

              // Listen for changes to match progress data
              groupRef.on("value", (snapshot) => {
                const matchProgressData = snapshot.val();
                if (matchProgressData) {
                  // Update selected options and progress bars based on retrieved match progress data
                  for (let i = 0; i < matchDataArray.length; i++) {
                    const matchIndex = i;
                    for (const option in matchProgressData[matchIndex]) {
                      const progressElement = document.getElementById(
                        `progress_${matchIndex}_${option}`
                      );
                      if (progressElement) {
                        // Update selectedOptions object
                        selectedOptions[matchIndex] =
                          selectedOptions[matchIndex] || {};
                        selectedOptions[matchIndex][option] =
                          matchProgressData[matchIndex][option];

                        // Update progress bars based on selectedOptions
                        progressElement.value = selectedOptions[matchIndex][
                          option
                        ]
                          ? 100
                          : 0;
                      }
                    }
                  }
                }
              });

              // end the loading
              endLoading();

              const copyLinkImg = document.getElementById("copyLinkImg");
              const notification = document.getElementById("notification");
              notification.innerHTML = "Group link copied!";

              copyLinkImg.addEventListener("click", async () => {
                const groupLink = `https://pickx.online/memberAuthentication.html?groupKey=${adminUid}`;
                // const groupLink = `https://192.168.0.116:5500/memberAuthentication.html?groupKey=${adminUid}`

                try {
                  await navigator.share({
                    title: "Icc World cup 2023 india!",
                    url: groupLink,
                  });
                  console.log("Sharing succeeded.");
                } catch (error) {
                  console.error("Sharing failed:", error);
                  // Fallback behavior if sharing is not supported
                  const tempInput = document.createElement("input");
                  document.body.appendChild(tempInput);
                  tempInput.value = groupLink;
                  tempInput.select();
                  document.execCommand("copy");
                  document.body.removeChild(tempInput);

                  // Show the notification
                  notification.classList.add("show-notification");

                  // Hide the notification after a delay
                  setTimeout(() => {
                    notification.classList.remove("show-notification");
                  }, 2000); // Hide after 2 seconds
                }
              });

              // const userNameRef = database.ref(`Admin/${adminUid}/groups/groupMembers/${user.uid}/displayName`);
              // const displayUsername = document.getElementById("DisplayUsername");

              // userNameRef.once('value', snapshot => {
              //     const userName = snapshot.val(); // Fetch the user's name
              //     if (userName) {
              //         displayUsername.textContent = "User: " + userName;
              //     } else {
              //         console.log("User's name not found.");
              //     }
              // });

              // Call the function to calculate and print sorted user scores
              calculateUserScoresAndSort(adminUid, matchDataArray)
                .then((sortedUserScores) => {
                  updateTableWithUserScores(sortedUserScores);
                })
                .catch((error) => {
                  console.error(
                    "Error calculating and sorting user scores:",
                    error
                  );
                });

              // console.log("test" + adminkeyValue);
              // console.log("AdminUid:", adminUid);
            } else {
              // Reference to the Adminkeys node for the current user
              const adminkeysRef = database.ref("Adminkeys/" + user.uid);

              // start the loadinf
              startLoading();

              adminkeysRef
                .once("value")
                .then((snapshot) => {
                  const adminkeyValue = snapshot.val().adminkey;

                  if (adminkeyValue) {
                    adminUid = adminkeyValue;

                    // User is authenticated, retrieve match progress data from the database and update progress bars
                    const groupRef = database.ref(
                      `Admin/${adminUid}/groups/groupMembers/${user.uid}/matchProgress`
                    );
                    const createdByNameElement =
                      document.getElementById("createdBy");
                    const adminNameRef = database.ref(
                      `Admin/${adminUid}/userName`
                    );

                    // console.log("Admin uid " + adminUid);

                    // console.log("Member uid " + user.uid);
                    addMemberToAdmin(adminUid, user.uid);

                    // check if the admin exits
                    const adminRef = database.ref(`Admin/${adminUid}`);
                    adminRef.on(
                      "value",
                      (snapshot) => {
                        if (snapshot.exists) {
                          // User is a member of the group
                        } else {
                          alert("This group doesn't exits.");
                          // Handle not being a member
                          const redirectURL = `authentication.html`;
                          window.location.href = redirectURL;
                        }
                      },
                      (error) => {
                        // Handle errors
                        console.error(
                          "Admin Error checking group membership:",
                          error
                        );
                      }
                    );

                    // Listen for changes to match progress data for all members
                    const allMembersRef = database.ref(
                      `Admin/${adminUid}/groups/groupMembers`
                    );
                    allMembersRef.on("value", (snapshot) => {
                      // Initialize an array to keep track of team votes for each match
                      const matchTeamVotes = new Array(
                        matchDataArray.length
                      ).fill({
                        team1: 0,
                        team2: 0,
                      });

                      snapshot.forEach((memberSnapshot) => {
                        const matchProgressData = memberSnapshot
                          .child("matchProgress")
                          .val();

                        if (matchProgressData) {
                          for (let i = 0; i < matchDataArray.length; i++) {
                            const matchIndex = i;

                            // Count the votes for each team for this match
                            let team1Votes = 0;
                            let team2Votes = 0;

                            for (const option in matchProgressData[
                              matchIndex
                            ]) {
                              if (
                                matchProgressData[matchIndex][option] === true
                              ) {
                                if (option === "team1") {
                                  team1Votes++;
                                } else if (option === "team2") {
                                  team2Votes++;
                                }
                              }
                            }

                            // Update the array with team votes for this match
                            matchTeamVotes[matchIndex] = {
                              team1:
                                matchTeamVotes[matchIndex].team1 + team1Votes,
                              team2:
                                matchTeamVotes[matchIndex].team2 + team2Votes,
                            };
                          }
                        }
                      });

                      // Iterate over the match data and update the progress bars
                      for (
                        let matchIndex = 0;
                        matchIndex < matchDataArray.length;
                        matchIndex++
                      ) {
                        const team1Votes = matchTeamVotes[matchIndex].team1;
                        const team2Votes = matchTeamVotes[matchIndex].team2;

                        // Calculate the total number of votes
                        const totalVotes = team1Votes + team2Votes;

                        // Calculate the percentages for each team
                        let team1Percentage = 0;
                        let team2Percentage = 0;

                        if (totalVotes > 0) {
                          team1Percentage = (team1Votes / totalVotes) * 100;
                          team2Percentage = (team2Votes / totalVotes) * 100;
                        }

                        // Update progress bars based on the calculated percentages
                        const progressElementTeam1 = document.getElementById(
                          `progress_${matchIndex}_team1`
                        );
                        const progressElementTeam2 = document.getElementById(
                          `progress_${matchIndex}_team2`
                        );

                        if (progressElementTeam1 && progressElementTeam2) {
                          progressElementTeam1.value = team1Percentage;
                          progressElementTeam2.value = team2Percentage;
                        }

                        // Update vote count display for both teams
                        updateVoteCount(adminUid, matchIndex, "team1");
                        updateVoteCount(adminUid, matchIndex, "team2");
                      }
                    });

                    // Listen for changes to match progress data
                    groupRef.on("value", (snapshot) => {
                      const matchProgressData = snapshot.val();
                      if (matchProgressData) {
                        // Update selected options and progress bars based on retrieved match progress data
                        for (let i = 0; i < matchDataArray.length; i++) {
                          const matchIndex = i;
                          for (const option in matchProgressData[matchIndex]) {
                            const progressElement = document.getElementById(
                              `progress_${matchIndex}_${option}`
                            );
                            if (progressElement) {
                              // Update selectedOptions object
                              selectedOptions[matchIndex] =
                                selectedOptions[matchIndex] || {};
                              selectedOptions[matchIndex][option] =
                                matchProgressData[matchIndex][option];

                              // Update progress bars based on selectedOptions
                              progressElement.value = selectedOptions[
                                matchIndex
                              ][option]
                                ? 100
                                : 0;
                            }
                          }

                          // Update vote count display for both teams
                          updateVoteCount(adminUid, matchIndex, "team1");
                          updateVoteCount(adminUid, matchIndex, "team2");
                        }
                      }
                    });

                    groupRef.once("value", (snapshot) => {
                      const matchProgressData = snapshot.val();
                      if (matchProgressData) {
                        // console.log("matchProgressData:", matchProgressData);
                        for (let i = 0; i < matchDataArray.length; i++) {
                          const matchIndex = i;
                          const userSelections = matchProgressData[matchIndex];

                          if (userSelections) {
                            const team1Selection = userSelections.team1;
                            const team2Selection = userSelections.team2;

                            if (team1Selection) {
                              const selectedRadioButton =
                                document.getElementById(
                                  `team1_${matchIndex}_${matchDataArray[
                                    matchIndex
                                  ].team1
                                    .replace(/ /g, "-")
                                    .toLowerCase()}_${matchDataArray[
                                    matchIndex
                                  ].team2
                                    .replace(/ /g, "-")
                                    .toLowerCase()}`
                                );
                              if (selectedRadioButton) {
                                selectedRadioButton.checked = true;
                              }
                            } else if (team2Selection) {
                              const selectedRadioButton =
                                document.getElementById(
                                  `team2_${matchIndex}_${matchDataArray[
                                    matchIndex
                                  ].team1
                                    .replace(/ /g, "-")
                                    .toLowerCase()}_${matchDataArray[
                                    matchIndex
                                  ].team2
                                    .replace(/ /g, "-")
                                    .toLowerCase()}`
                                );
                              if (selectedRadioButton) {
                                selectedRadioButton.checked = true;
                              }
                            }
                          }
                        }
                      }
                    });

                    adminNameRef.once("value", (snapshot) => {
                      const userName = snapshot.val(); // Fetch the user's name
                      if (userName) {
                        createdByNameElement.textContent =
                          "Group created by: " + userName;
                      } else {
                        console.log("User's name not found.");
                      }
                    });

                    // Listen for changes to match progress data
                    groupRef.on("value", (snapshot) => {
                      const matchProgressData = snapshot.val();
                      if (matchProgressData) {
                        // Update selected options and progress bars based on retrieved match progress data
                        for (let i = 0; i < matchDataArray.length; i++) {
                          const matchIndex = i;
                          for (const option in matchProgressData[matchIndex]) {
                            const progressElement = document.getElementById(
                              `progress_${matchIndex}_${option}`
                            );
                            if (progressElement) {
                              // Update selectedOptions object
                              selectedOptions[matchIndex] =
                                selectedOptions[matchIndex] || {};
                              selectedOptions[matchIndex][option] =
                                matchProgressData[matchIndex][option];

                              // Update progress bars based on selectedOptions
                              progressElement.value = selectedOptions[
                                matchIndex
                              ][option]
                                ? 100
                                : 0;
                            }
                          }
                        }
                      }
                    });

                    // end the loading
                    endLoading();

                    const copyLinkImg = document.getElementById("copyLinkImg");
                    const notification =
                      document.getElementById("notification");
                    notification.innerHTML = "Group link copied!";

                    copyLinkImg.addEventListener("click", async () => {
                      const groupLink = `https://pickx.online/memberAuthentication.html?groupKey=${adminUid}`;
                      // const groupLink = `https://192.168.0.116:5500/memberAuthentication.html?groupKey=${adminUid}`

                      try {
                        await navigator.share({
                          title: "Icc World cup 2023 india!",
                          url: groupLink,
                        });
                        console.log("Sharing succeeded.");
                      } catch (error) {
                        console.error("Sharing failed:", error);
                        // Fallback behavior if sharing is not supported
                        const tempInput = document.createElement("input");
                        document.body.appendChild(tempInput);
                        tempInput.value = groupLink;
                        tempInput.select();
                        document.execCommand("copy");
                        document.body.removeChild(tempInput);

                        // Show the notification
                        notification.classList.add("show-notification");

                        // Hide the notification after a delay
                        setTimeout(() => {
                          notification.classList.remove("show-notification");
                        }, 2000); // Hide after 2 seconds
                      }
                    });

                    // const userNameRef = database.ref(`Admin/${adminUid}/groups/groupMembers/${user.uid}/displayName`);
                    // const displayUsername = document.getElementById("DisplayUsername");

                    // userNameRef.once('value', snapshot => {
                    //     const userName = snapshot.val(); // Fetch the user's name
                    //     if (userName) {
                    //         displayUsername.textContent = "User: " + userName;
                    //     } else {
                    //         console.log("User's name not found.");
                    //     }
                    // });

                    // Call the function to calculate and print sorted user scores
                    calculateUserScoresAndSort(adminUid, matchDataArray)
                      .then((sortedUserScores) => {
                        updateTableWithUserScores(sortedUserScores);
                      })
                      .catch((error) => {
                        console.error(
                          "Error calculating and sorting user scores:",
                          error
                        );
                      });

                    // console.log("test" + adminkeyValue);
                    // console.log("AdminUid:", adminUid);
                  } else {
                    console.log(user.uid);
                    console.log("Adminkey not found.");
                  }
                })
                .catch((error) => {
                  console.error("Error fetching Adminkey:", error);
                });
            }




          }


        } else {
          console.error("Data retrieved from the database is not an array.");
        }
      })
      .catch((error) => {
        console.error("Error fetching match data from the database:", error);
      });


  } else {
    alert("This group doesn't exits.");
    const redirectURL = `authentication.html`;
    window.location.href = redirectURL;
  }
});

// Function to add member UID to admin's array
function addMemberToAdmin(adminUid, memberUid) {
  const memberUidsRef = database.ref("Admin/" + adminUid + "/memberUids");

  // Fetch the current array of member UIDs
  memberUidsRef.once("value", (snapshot) => {
    const currentArray = snapshot.val() || [];

    // Check if the member UID is already in the array
    if (!currentArray.includes(memberUid)) {
      currentArray.push(memberUid);

      // Update the array in the admin's node
      memberUidsRef
        .set(currentArray)
        .then(() => {
          console.log("UID added to members array in Admin node.");
        })
        .catch((error) => {
          console.error(
            "Error adding UID to members array in Admin node:",
            error
          );
        });
    } else {
      // console.log("UID is already in the members array.");
    }
  });
}

// Function to get and print member UIDs from admin's array
function getAndPrintMemberUids(adminUid) {
  const memberUidsRef = database.ref("Admin/" + adminUid + "/memberUids");

  // Fetch the array of member UIDs
  memberUidsRef.once("value", (snapshot) => {
    const memberUids = snapshot.val() || [];

    // Print member UIDs to the console
    // console.log("Member UIDs:", memberUids);
  });
}

async function countVotesForMatchAndTeam(adminUid, matchIndex, selectedTeam) {
  const memberUidsRef = database.ref(`Admin/${adminUid}/memberUids`);
  const snapshot = await memberUidsRef.once("value");
  const memberUids = snapshot.val() || [];

  let voteCount = 0;

  await Promise.all(
    memberUids.map(async (memberUid) => {
      const matchProgressRef = database.ref(
        `Admin/${adminUid}/groups/groupMembers/${memberUid}/matchProgress/${matchIndex}/${selectedTeam}`
      );
      const progressSnapshot = await matchProgressRef.once("value");
      if (progressSnapshot.val() === true) {
        voteCount++;
      }
    })
  );

  // Return the vote count
  return voteCount;
}

async function updateVoteCount(adminUid, matchIndex, selectedTeam) {
  try {
    const voteCount = await countVotesForMatchAndTeam(
      adminUid,
      matchIndex,
      selectedTeam
    );
    const voteCountSpan = document.querySelector(
      `.members[data-match-index="${matchIndex}"][data-team="${selectedTeam}"]`
    );

    if (voteCountSpan) {
      voteCountSpan.textContent = voteCount;
    }
  } catch (error) {
    console.error("Error updating vote count:", error);
  }
}

async function calculateUserScoresAndSort(adminUid, matchDataArray) {


  const memberUidsRef = database.ref(`Admin/${adminUid}/memberUids`);
  const snapshot = await memberUidsRef.once("value");
  const memberUids = snapshot.val() || [];

  const userScores = {};

  await Promise.all(
    memberUids.map(async (memberUid) => {
      let userScore = 0;

      for (
        let matchIndex = 0;
        matchIndex < matchDataArray.length;
        matchIndex++
      ) {
        const match = matchDataArray[matchIndex];
        const matchProgressRef = database.ref(
          `Admin/${adminUid}/groups/groupMembers/${memberUid}/matchProgress/${matchIndex}`
        );
        const progressSnapshot = await matchProgressRef.once("value");
        const matchProgress = progressSnapshot.val();

        if (matchProgress) {
          const selectedTeam = Object.keys(matchProgress).find(
            (option) => matchProgress[option] === true
          );

          // Get the match date and time from the matchDataArray
          const matchDate = match.matchDate;
          const matchTime = getLocalizedTime(matchDataArray[matchIndex]);

          // Calculate the current time
          const currentTime = new Date();

          // Convert matchDate and matchTime to a Date object
          const currentYear = new Date().getFullYear(); // Get the current year
          const matchDateTimeString = `${currentYear}-${matchDate} ${matchTime}`;
          const matchDateTime = new Date(matchDateTimeString);

          // console.log("Match Time " + matchDateTime);
          // console.log("Current Time " + currentTime);

          // Calculate the time difference in minutes
          const timeDifferenceMinutes = Math.floor(
            (matchDateTime - currentTime) / (1000 * 60)
          );

          // console.log(timeDifferenceMinutes);

          // console.log(selectedTeam);

          if (timeDifferenceMinutes < -30) {
            // The match has already started and it's more than 30 minutes past the match time
            // Mark the vote as invalid
          } else if (timeDifferenceMinutes <= 0 || timeDifferenceMinutes >= 0) {
            // User voted within the time limit (30 minutes)
            if (selectedTeam === match.winningTeam) {
              // User's vote matches the winning team
              userScore += 100;
            } else {
              // User's vote does not match the winning team
            }
          } else {
            // User voted after the time limit, invalidate the vote
          }
        }
      }

      userScores[memberUid] = {
        score: userScore,
        uid: memberUid,
      };
    })
  );

  const sortedUserScores = Object.entries(userScores)
    .sort((a, b) => b[1].score - a[1].score || a[1].uid.localeCompare(b[1].uid))
    .map(([uid, data]) => ({ uid, score: data.score }));

  // Print the sorted user scores
  sortedUserScores.forEach(({ uid, score }) => {
    const userNameRef = database.ref(
      `Admin/${adminUid}/groups/groupMembers/${uid}/displayName`
    );
    userNameRef.once("value", (snapshot) => {
      const userName = snapshot.val();
      console.log(`User UID: ${uid}, Name: ${userName}, Score: ${score}`);
    });
  });

  return sortedUserScores;
}

function checkVoteTimeOut(matchDataArray) {
  // Get the match date and time from the matchDataArray
  const matchDate = matchDataArray.matchDate;
  const matchTime = getLocalizedTime(matchDataArray);

  // Calculate the current time
  const currentTime = new Date();

  // Convert matchDate and matchTime to a Date object
  const currentYear = new Date().getFullYear(); // Get the current year
  const matchDateTimeString = `${currentYear}-${matchDate} ${matchTime}`;
  const matchDateTime = new Date(matchDateTimeString);

  // console.log("Match Time " + matchDateTime);
  // console.log("Current Time " + currentTime);

  // Calculate the time difference in minutes
  const timeDifferenceMinutes = Math.floor(
    (matchDateTime - currentTime) / (1000 * 60)
  );

  console.log(timeDifferenceMinutes);

  if (timeDifferenceMinutes < -30) {
    // The match has already started and it's more than 30 minutes past the match time
    // Mark the vote as invalid

    // User voted after the time limit, invalidate the vote

    console.log("Time out");

    const notification = document.getElementById("notification");
    notification.innerHTML = "Match started vote not valid";

    // Show the notification
    notification.classList.add("show-notification");

    // Hide the notification after a delay
    setTimeout(() => {
      notification.classList.remove("show-notification");
    }, 2000); // Hide after 2 seconds
  }
}

function updateMatchStatus(matchDataArray) {
  // Set the current time to October 14, 2023, 23:00 (11:00 PM)
  const currentTime = new Date("2023-10-14T23:00:00");

  // Iterate through each match in the matchDataArray
  matchDataArray.forEach((match) => {
    // Get the match date and time from the current match
    const matchDate = match.matchDate;
    const matchTime = getLocalizedTime(match);

    // Convert matchDate and matchTime to a Date object
    const currentYear = new Date().getFullYear(); // Get the current year
    const matchDateTimeString = `${currentYear}-${matchDate} ${matchTime}`;
    const matchDateTime = new Date(matchDateTimeString);

    // Calculate the time difference in minutes

    const timeDifferenceMinutes = Math.floor(
      (matchDateTime - currentTime) / (1000 * 60)
    );

    if (timeDifferenceMinutes <= 0) {
      // Match time has passed
      const dateElement = document.querySelector(`#date-${match.description}`);
      if (dateElement) {
        dateElement.style.display = "none";
      }

      // Check if it has been more than 10 hours since the match started
      const hoursDifference = Math.floor(
        (currentTime - matchDateTime) / (1000 * 60 * 60)
      );

      if (hoursDifference >= 10) {
        const matchLiveElement = document.querySelector(
          `#live-${match.description}`
        );
        if (matchLiveElement) {
          matchLiveElement.style.display = "block"; // Display "match-live" class
        }
      }
    }
  });
}

function getRandomColor() {
  const vibrantColors = [
    "hsl(340, 80%, 65%)", // Pink
    "hsl(200, 80%, 65%)", // Blue
    "hsl(0, 80%, 65%)", // Red
    "hsl(280, 80%, 65%)", // Purple
    // Add more vibrant colors here...
  ];

  return vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
}


function updateTableWithUserScores(sortedUserScores) {
  const table = document.querySelector(".tableWrapper");

  sortedUserScores.forEach((userData, index) => {
    const newRow = document.createElement("article");
    newRow.className = "row nfl";

    const ul1 = document.createElement("ul");
    const ul2 = document.createElement("ul");

    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");

    ul1.appendChild(li1);
    ul1.appendChild(li2);
    ul1.appendChild(li3);

    newRow.appendChild(ul1);
    newRow.appendChild(ul2);

    const userNameRef = database.ref(
      `Admin/${adminUid}/groups/groupMembers/${userData.uid}/displayName`
    );

    userNameRef.once("value", (snapshot) => {
      const userName = snapshot.val();
      li1.textContent = userName;
      li1.style.color = getRandomColor(); // Apply random color to the name
      li2.textContent = `${userData.score}`;
      li3.textContent = `#${index + 1}`;
    });

    // Create the section element for the first row and add the class
    if (index === 0) {
      const section = document.createElement("section");
      section.className = "row-fadeIn-wrapper";
      section.appendChild(newRow);
      table.appendChild(section);
    } else {
      // For subsequent rows, directly add to the table
      table.appendChild(newRow);
    }
  });
}





document.addEventListener("DOMContentLoaded", () => {
  const seeResultsBtns = document.querySelectorAll(".seeResultsBtn");
  const modalOverlay = document.querySelector(".modal-overlay");
  const closeModalBtn = document.querySelector(".closeModalBtn");

  seeResultsBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      modalOverlay.style.display = "flex";
      document.querySelector(".backdrop").classList.add("active");
    });
  });

  closeModalBtn.addEventListener("click", () => {
    modalOverlay.style.display = "none";
    document.querySelector(".backdrop").classList.remove("active");
  });

  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      modalOverlay.style.display = "none";
      document.querySelector(".backdrop").classList.remove("active");
    }
  });
});
