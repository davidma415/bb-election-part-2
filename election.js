document.addEventListener("DOMContentLoaded", function() {
  var candidateButton = document.getElementById('button1')
  var listCandidates = document.getElementById('candidates-list')
  candidateButton.addEventListener('click', returnCandidates);
  var refreshButton = document.getElementById('refresh');
  refreshButton.addEventListener('click', refreshVotes);
  function refreshVotes() {
    var candidates = document.getElementsByClassName('display-candidate');
    $.ajax({
      url: 'https://bb-election-api.herokuapp.com/',
      method: 'GET',
      data: {},
      dataType: 'json'
    }).done(function(responseData) {
      for (var i = 0; i < candidates.length; i++) {
        candidates[i].innerHTML = 'Name: ' + responseData.candidates[i].name + ' Votes: ' + responseData.candidates[i].votes;
      }
    })
  }

  function returnCandidates() {
    $.ajax({
      url: 'https://bb-election-api.herokuapp.com/',
      method: 'GET',
      data: {},
      dataType: 'json'
    }).done(function(responseData) {
      for (var i = 0; i < responseData.candidates.length; i++) {
        listItem = document.createElement('li');
        listItem.classList = 'display-candidate';
        listItem.innerHTML = 'Name: ' + responseData.candidates[i].name + ' Votes: ' + responseData.candidates[i].votes;
        listCandidates.append(listItem);
        createForm = document.createElement('form');
        createForm.method = "post";
        createForm.action = "https://bb-election-api.herokuapp.com/vote";
        formButton = document.createElement('button');
        formButton.type = "submit";
        formButton.innerHTML = "Vote!";
        hiddenInput = document.createElement('input');
        hiddenInput.type = "hidden";
        hiddenInput.name = "name";
        hiddenInput.value = responseData.candidates[i].name;
        createForm.append(formButton, hiddenInput);
        listCandidates.append(createForm);
      }
    });
  }

  listCandidates.addEventListener('submit', function(submit) {
    submit.preventDefault();
    var submittedForm = submit.target;
    
    $.ajax({
      url: 'https://bb-election-api.herokuapp.com/vote',
      method: 'POST',
      data: $(submittedForm).serialize()
    }).done(function() {
      console.log('Request successful');
    }).fail(function() {
      console.log('Request was unsuccessful');
    });
  });
});
