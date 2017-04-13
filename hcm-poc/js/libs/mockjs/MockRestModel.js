require(['ojs/ojcore', 'knockout', 'jquery', 'mockjax', 'mockrest'],
function(oj, ko, $)
{   
  function viewModel()
  {
    var self = this;
    
  }
  var vm = new viewModel;

  $(document).ready
  (
    function()
    {
       //my team mock rest service  
       $.getJSON("js/data/MyTeamHCM.json",
                    function (data) {
                        new MockRESTServer(data, {id: "partyId",
                            url: /^http:\/\/mockrest\/applcore\/rest\/employees(\?limit=([\d]*))?$/i,
                            idUrl: /^http:\/\/mockrest\/applcore\/rest\/employees\/([\d]+)$/i});
       });  
       //my team pca actions rest service
       $.getJSON("js/data/MyTeamActionsData.json",
                    function (data) {
                        new MockRESTServer(data, {id: "partyId",
                            url: /^http:\/\/mockrest\/applcore\/rest\/employee\/actions(\?limit=([\d]*))?$/i,
                            idUrl: /^http:\/\/mockrest\/applcore\/rest\/employee\/actions\/([\d]+)$/i});
       }); 
       
       //my team pca tabs list rest service
       $.getJSON("js/data/MyTeamTabsData.json",
                    function (data) {
                        new MockRESTServer(data, {id: "partyId",
                            url: /^http:\/\/mockrest\/applcore\/rest\/employee\/tabs(\?limit=([\d]*))?$/i,
                            idUrl: /^http:\/\/mockrest\/applcore\/rest\/employee\/tabs\/([\d]+)$/i});
       });  
       
       //emp transfer basic details mock rest service
       $.getJSON("js/data/TransferEmp_BasicDetails.json",
                    function (data) {
                        new MockRESTServer(data, {
                            url: /^http:\/\/mockrest\/applcore\/rest\/employee\/basic(\?limit=([\d]*))?$/i});
       });  
       //emp transfer job details mock rest service
       $.getJSON("js/data/TransferEmp_JobDetails.json",
                    function (data) {
                        new MockRESTServer(data, {
                            url: /^http:\/\/mockrest\/applcore\/rest\/employee\/job(\?limit=([\d]*))?$/i});
       }); 
       //emp transfer other details mock rest service
       $.getJSON("js/data/TransferEmp_EmpDetails.json",
                    function (data) {
                        new MockRESTServer(data, {
                            url: /^http:\/\/mockrest\/applcore\/rest\/employee\/emp(\?limit=([\d]*))?$/i});
       }); 
       $.getJSON("js/data/TransferEmp_Location_Details.json",
                    function (data) {
                        new MockRESTServer(data, {
                            url: /^http:\/\/mockrest\/applcore\/rest\/employee\/locationDetails(\?limit=([\d]*))?$/i});
       });
       $.getJSON("js/data/TransferEmp_Manager_Details.json",
                    function (data) {
                        new MockRESTServer(data, {
                            url: /^http:\/\/mockrest\/applcore\/rest\/employee\/managerDetails(\?limit=([\d]*))?$/i});
       });
       $.getJSON("js/data/TransferEmp_CompensationDetails.json",
                    function (data) {
                        new MockRESTServer(data, {
                            url: /^http:\/\/mockrest\/applcore\/rest\/employee\/compensationDetails(\?limit=([\d]*))?$/i});
       });
       $.getJSON("js/data/TransferEmp_Work_Measure_Details.json",
                    function (data) {
                        new MockRESTServer(data, {
                            url: /^http:\/\/mockrest\/applcore\/rest\/employee\/workMeasureDetails(\?limit=([\d]*))?$/i});
       });
       $.getJSON("js/data/TransferEmp_Manager_Details.json",
                    function (data) {
                        new MockRESTServer(data, {
                            url: /^http:\/\/mockrest\/applcore\/rest\/employee\/managerDetails(\?limit=([\d]*))?$/i});
       });
       $.getJSON("js/data/TransferEmp_Salary_Range.json",
                    function (data) {
                        new MockRESTServer(data, {
                            url: /^http:\/\/mockrest\/applcore\/rest\/employee\/salaryRange(\?limit=([\d]*))?$/i});
       });
    }
  );
});
