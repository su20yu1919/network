'use strict';

// Members controller
angular.module('members').controller('MembersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Members', 'Participants',
	function($scope, $stateParams, $location, Authentication, Members, Participants) {
		$scope.authentication = Authentication;

		// Create new Member
		$scope.create = function() {
			
		var resetMemberAttributes = function(Participant) {
				// Clear form fields
				$scope.selected = null;       //make sure no participant is selected
				$scope.member.firstName = '';
				$scope.member.lastName = '';
				$scope.member.phone = '';
				$scope.member.email = '';
				$scope.member.identity = '';
				$scope.member.affiliation = '';
				$scope.member.address = '';
				$scope.member.shirtSize = '';
				$scope.member.shirtReceived = '';
				$scope.member.talent = '';
				$scope.member.placeOfWorship = '';
				$scope.member.recruitment = '';
				$scope.member.communityNetworks[0] = '';
				$scope.member.communityNetworks[1] = '';
				$scope.member.communityNetworks[2] = '';
				$scope.member.extraGroups[0] = '';
				$scope.member.extraGroups[1] = '';
				$scope.member.extraGroups[2] = '';
				$scope.member.otherNetworks[0] = '';
				$scope.member.otherNetworks[1] = '';
				$scope.member.otherNetworks[2] = '';
				//set focus to Find participant field
				var participant_input = document.querySelector('#participant');
				if (participant_input) {
					participant_input.focus();
				}
			};
				/*
			//if a participant was selected
				//set the member id to the participant id
				//update the member
			//else
				//create the member
		
			  */
				
			if($scope.participant && $scope.participant._id) {
				$scope.member._id = $scope.participant._id;
				$scope.member.$update(function(response) {
					resetMemberAttributes(response);
				}, function(errorResponse) {
				    $scope.error = errorResponse.data.message;
				});
			} else {                 
				// Create new Member 

				var member = new Members($scope.member);
				// Redirect after save
				member.$save(function(response) {
					resetMemberAttributes(response);
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
				
			} 
		};

		// Remove existing Member
		$scope.remove = function(member) {
			if ( member ) { 
				member.$remove();

				for (var i in $scope.members) {
					if ($scope .members [i] === member) {
						$scope.members.splice(i, 1);
					}
				}
			} else {
				$scope.member.$remove(function() {
					$location.path('members');
				});
			}
		};

		// Update existing Member
		$scope.update = function() {
			var member = $scope.member;

			member.$update(function() {
				$location.path('members/' + member._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Members
		$scope.find = function() {
			$scope.members = Members.query();
		};
		
		// Find existing participants
		$scope.findParticipants = function(name) {
			return Participants.query({name: name}).$promise;
		};


		// Find existing Member
		$scope.findOne = function() {
			$scope.member = Members.get({ 
				memberId: $stateParams.memberId
			});
		};
	}
]);