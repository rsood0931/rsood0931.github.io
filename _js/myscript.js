// Rahul Sood 991458740

var groupArray = new Array();
var dirArray = new Array();
var servArray = new Array();
var rowID;
var flag = "A3-#-";



$(document).on("pagecreate", "#mainPage", function() {
	console.log("in mainPage");
	
	$.getJSON("a3_FoodGroups.json", function (data){
			console.log("in getJSON");
	groups = data.Foodgroups.groups;
	
	$("#titleMain").html(data.Foodgroups["publisher-group"]);
	$("#titleMain").append(" <img src='_images/" + data.Foodgroups.HeaderImage + ".jpg" + "' width='46px' style='border-radius: 5px '>");
	
	$("#fGroup").html("");
	
	
	
	for(x=0; x<groups.length; x++)
	{
		
				groupArray[x] = groups[x].groupName;
				dirArray[x] = groups[x].Directions;
				servArray[x] = groups[x].Servings;
				
				$("#fGroup").append(
					"<li li-id='" + x + "'>" + 
						"<a href='#secondPage' " + "class='ui-btn ui-icon-" + groups[x].groupImage +  " ui-btn-icon-right'>" + 
						groups[x].groupName + 
					 "</a>"  +
					"</li>"
				);
	};// end of for Loop
	
	$("#fGroup").listview("refresh");
		
	for(x=0; x < groups.length; x++)
	{
		$("#queryType").append("<label>" + "<input type='radio' name='queryTypeList' value='" + 
							groups[x].groupName + "' required>"  + groups[x].groupName + 
							"<img style='float:right;' src='_images/" + groups[x].groupImage + ".jpg" + "' width='3.5%'>" + 
								"</label>");
	};
	
	$("input[type='radio']").checkboxradio();

	}); //end of .getJSON
	
	
	$.getJSON("aboutMe.json", function (data){
		console.log("in aboutMe.Json");
		
		$("#abtMe").click(function() {
		$.mobile.changePage("#aboutMe", 
						{transition: "pop", role: "dialog"});
		});


		
		$("#pic").html("<img src='_images/" + data.image + ".jpg" + "' width= 120'>");

		$("#info").html("Name: " + data.name + "<br>Student Number: " + data["student-number"] 
											 + "<br>Program: " + data.program + "<br>Quote: "  
											 + data.quote);
		
		
		
	}); //end of 2nd .getJSON
	
	
}); //end of ID mainPage


//Finding the row selected on the first page
$(document).on("click", "#fGroup >li", function() {
	rowID = $(this).closest("li").attr("li-id");
	console.log(rowID);
});

$(document).on("click", "#close", function() {
	$("[data-role=panel]").panel("close");
});




$(document).on("pagebeforeshow", "#secondPage", function() {
	console.log("in SecondPage");
	
	
	$.getJSON("a3_FoodGroups.json", function (data){
		groups = data.Foodgroups.groups;
		
		dataID="";
		dataGender="";
		dataAges="";
		dataServingSize="";

		var title = groupArray[rowID];
		var grp = groups[rowID].Servings;
		
		for(x=0; x<groups[0].Servings.length; x++)
		{
			dataID += grp[x].fgID + "<br>";
			dataGender += grp[x].gender + "<br>";
			dataAges += grp[x].ages + "<br>";
			dataServingSize += grp[x].servingSize + "<br>";
			
			
			$("#directions").html("<strong> Directions - </strong>" + groups[rowID].Directions);
			
			
			$("#titleSecondPage").html(title);

		$("#servData").html("<tr>"  + "<th>Gender</th>" + "<th>Ages</th>" + "<th>Serving Size</th>" + "</tr>");
		$("#servData").append("<tr>"  + "<td>" + dataGender + " </td>" + "<td>" + dataAges + "</td>" + "<td>" + dataServingSize + "</td>" + "</tr>")
			
		}	
		
	});
});

$(document).on("pageshow", "#mainPage", function() {
	
	
	$("#Ltype").html("<var style='font-weight: 900;'>Question Type - </var> " + localStorage.getItem(flag+"QuesType"));
	
	$("#Lemail").html("<var style='font-weight: 900;'>Email - </var>" + localStorage.getItem(flag+"Email"));

	$("#Ltxt").html("<var style='font-weight: 900;'>Question Text - </var>" + localStorage.getItem(flag+"Questxt"));

	$("#Lsenior").html("<var style='font-weight: 900;'>Senior - </var>" + localStorage.getItem(flag+"FlipSenior"));

	$("#Lcitizen").html("<var style='font-weight: 900;'>Citizen - </var>" + localStorage.getItem(flag+"FlipCitizen")); 


	});
	
	
function result(){
	alert("Name - Rahul Sood. \n\nSubmission is succeded");
	window.location.href="#mainPage";
	
	localStorage.setItem(flag + "Email", $("#mailID").val());
	localStorage.setItem(flag + "Questxt", $("#qTextID").val());
	localStorage.setItem(flag + "QuesType", $("input[name='queryTypeList']:checked").val());
	localStorage.setItem(flag + "FlipSenior", $("#sFlip option:selected").val());
	localStorage.setItem(flag + "FlipCitizen", $("#cFlip option:selected").val());
}